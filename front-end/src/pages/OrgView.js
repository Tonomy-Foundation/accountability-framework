import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Eosio from "../services/Eosio";
import TransactionsTable from "../components/TransactionsTable";
import OrgViewProfile from "../components/OrgViewProfile";
import OrgMembers from "../components/OrgMembers";
import { useHistory } from "react-router-dom";

function mapStateToProps(state) {
  return {
    eosio: state.eosio,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function OrgView(props) {
  const classes = useStyles();

  const [stateAccount, setStateAccount] = useState({
    accountName: props.match.params.accountName,
    name: null,
    isMyAccount: false,
    organizations: [],
    memberGroups: [],
    permissions: []
  })
  const [memberGroup, setMemberGroup] = useState({
    selected: null,
    members: []
  });
  const [stateTrxs, setStateTrxs] = useState([])

  const selectMemberGroup = (selectedGroupName) => {
    const selected = selectedGroupName === memberGroup.selected ? null : selectedGroupName;
    let members = []
    if (selected) {
      let permission = stateAccount.permissions.filter( (perm) => perm.perm_name === selectedGroupName)[0];
      for(let account of permission.required_auth.accounts) {
        members.push({
          name: account.permission.actor,
          type: "person"
        })
      }
    }

    setMemberGroup({
      selected: selected,
      members: members
    })
  };

  const history = useHistory();

  useEffect(() => {
    let eosio;
    let loggedinAccount;
    if (props.eosio) {
      eosio = props.eosio;
      loggedinAccount = eosio.account.name;
    } else {
      eosio = new Eosio();
    }

    async function getAccount() {
      let accountRes = await eosio.dfuseClient.apiRequest("/v1/chain/get_account", "POST", null, {account_name: stateAccount.accountName})
      if (accountRes.accountType === "person") {
        const orgPath = '/people/' + stateAccount.accountName;
        history.push(orgPath);
      }
      let memberGroups = [];
      for (let perm1 of accountRes.permissions) {
        let level = 1;
        function checkParentPerm(perm2) {
          if (perm2.perm_name === "owner") return;
          level++;
          let parent = accountRes.permissions.filter( (perm3) => perm3.perm_name === perm2.parent)[0]
          checkParentPerm(parent);
        }
        checkParentPerm(perm1);
        memberGroups.push({
          name: perm1.perm_name,
          level: level
        })
      }
      memberGroups.sort((a, b) => a.level > b.level)
      setStateAccount({
        accountName: stateAccount.accountName,
        name: accountRes.name,
        isMyAccount: loggedinAccount === stateAccount.accountName,
        organizations: accountRes.organizations,
        memberGroups: memberGroups,
        permissions: accountRes.permissions
      })

      const query = "(auth:"+stateAccount.accountName+" OR receiver:"+stateAccount.accountName+")"
      let transactionRes = await eosio.dfuseClient.searchTransactions(query);
      let trxsToSet = [];

      for (let trxItem of transactionRes.transactions) {
        let trx = trxItem.lifecycle;
        if (trx.transaction_status === "executed" && trx.pub_keys) {
          const receiverAccount = trx.execution_trace.action_traces[0].act.account;
          let trxToPush = {
            tx_id: trx.id,
            timestamp: trx.execution_block_header.timestamp,
            account: receiverAccount
          };
          
          const sentFrom = trx.execution_trace.action_traces[0].act.authorization[0].actor;
          if (sentFrom === receiverAccount) trxToPush.direction = "self";
          else if (sentFrom === stateAccount.accountName)
            trxToPush.direction = "outbound";
          else trxToPush.direction = "inbound";

          const [type, data] = getType(
            trxToPush,
            trx.execution_trace.action_traces[0].act.name,
            trx.execution_trace.action_traces[0].act.data
          );
          trxToPush.type = type;
          trxToPush.data = data;

          trxToPush.pubKey = trx.pub_keys[0];
          trxToPush.blockNum = trx.execution_trace.action_traces[0].block_num;

          trxsToSet.push(trxToPush)
        }
      }

      async function getAuth(trx, index) {
        if (!trx.pubKey) return;

        const publicKey = trx.pubKey;
        const blockNum = trx.blockNum;
        let keyRes;
        try {
          keyRes = await eosio.dfuseClient.stateKeyAccounts(publicKey, {block_num: blockNum});
          if (keyRes && keyRes.account_names[0]) trxsToSet[index].auth = keyRes.account_names[0];
        } catch(err) {
          console.error("error searching for key", {key: publicKey, block_num: blockNum}, err);
        }
      }
      await Promise.all(trxsToSet.map((trx, index) => getAuth(trx, index)));

      await setStateTrxs(trxsToSet);
    }

    getAccount();
  }, [props.eosio, stateAccount.accountName]);

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid key={0} item xs={6}>
        <OrgViewProfile
          accountName={stateAccount.accountName}
          name={stateAccount.name}
          isMyAccount={stateAccount.isMyAccount}
          organizations={stateAccount.organizations}
          description="Duis accumsan venenatis dui, tristique rhoncus elit posuere ut. Vivamus erat lacus, rutrum et iaculis sed, interdum vitae purus. Aliquam turpis nisl, dictum ac mi vel, eleifend placerat sapien."
          selectMemberGroup={selectMemberGroup}
          memberGroups={stateAccount.memberGroups}
        />
      </Grid>
      <Grid key={1} item xs={6}>
        {!memberGroup.selected && (
          <TransactionsTable
            accountName={stateAccount.accountName}
            transactions={stateTrxs}
            org
          />
        )}
        {memberGroup.selected && (
          <OrgMembers
            groupName={memberGroup.selected}
            members={memberGroup.members}
          />
        )}
      </Grid>
    </Grid>
  );
}

function getType(actionToPush, actionName, actionData) {
  let data;
  if (actionName === "transfer") {
    if (actionToPush.direction === "inbound") {
      data = "Received " + actionData.quantity;
      actionToPush.account = actionData.from;
    }
    else {
      data = "Sent " + actionData.quantity;
      actionToPush.account = actionData.to;
    }
    return ["payment", data];
  }
  if (actionToPush.account === "eosio") {
    if (actionName === "setcode") return ["contract", ""];
    if (actionName === "newperson") {
      data = actionData.name + " joined Conscious Cities";
      return ["account", data];
    }
    if (actionName === "neworg") {
      data = 'New organization "' + actionData.name + '" was created';
      return ["account", data];
    }
    if (actionName === "policyvote") {
      data = "Voted '" + actionData.vote + "' on policy " + actionData.policy_id;
      return ["vote", data];
    }
    return ["other", ""];
  } else return ["other", ""];
}


export default connect(mapStateToProps)(OrgView);
