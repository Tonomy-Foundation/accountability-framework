import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Eosio from '../services/Eosio';

function mapStateToProps(state) {
  return {
    eosio: state.eosio
  };
}

function PeopleViewProfile(props) {
  console.log("PeopleViewProfile", props);
  return (
    <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      Why do we use it?

      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

      Where does it come from?

      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
    </div>
  )
}

function PeopleViewTransactions(props) {
  console.log("PeopleViewTransactions", props);
  return PeopleViewProfile();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function PeopleView(props) {
  const classes = useStyles();

  const loggedinAccount = props.match.params.accountName;
  let accountName, isMyAccount=false;
  let eosio, organizations, transactions;
  if (props.eosio) {
    eosio = props.eosio;
    accountName = eosio.account.name;
    if (loggedinAccount===accountName) isMyAccount = true;
  } else {
    eosio = new Eosio();
  }

  // useEffect(() => {
  //   async function getAccount() {
  //     let accountRes = await eosio.rpc.get_account(accountName);
  //     let transactionsRes = await eosio.rpc.history_get_actions(accountName, -1, -100);
  //     console.log(accountRes, transactionsRes)
  //   }
  //   getAccount();
  // })

  console.log("PeopleView", props)
  return (
    <Grid container className={classes.root} spacing={0}>
          <Grid key={0} item xs={6}>
            <PeopleViewProfile
              accountName={accountName}
              isMyAccount={isMyAccount}
              organizations={[{
                name: "Facebook Inc.",
                accountName: "facebook"
              }]}/>
          </Grid>
          <Grid key={1} item xs={6}>
            <PeopleViewTransactions
              accountName={accountName}
              transactions={[{
                tx_id: "43243243",
                timestamp: new Date(),
                auth: "jack",
                account: "kirsten",
                data: "Jack paid Kirsten $10.00",
                type: "payment"
              }]}/>
          </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps)(PeopleView);