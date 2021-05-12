const accountController = require('../../controllers/accounts.controller');
// Eosio instantiation
const Eosio = require('../../services/Eosio');
const eosio = new Eosio();

/* GET acounts listing. */
module.exports = async function(req, res) {
    const accountName = req.body.account_name;
    if (!accountName) {
        res.status(400);
        res.send({ message: 'req body should contain all the data!' });
        return;
    }
    const accountDoc = await accountController.findOne({ accountName: accountName });
    if (!accountDoc) {
        res.status(404);
        res.send({ message: `Not found account with account name ${accountName}` });
    }

    const query = `account:eosio action:neworg (data.active.accounts.permission.actor:${accountName} OR data.owner.accounts.permission.actor:${accountName})`;
    let transactionRes = await eosio.dfuseClient.searchTransactions(query);
    // get array of account names from dfuse tranactions log

    let orgInfo = [];
    if (transactionRes.transactions) {
        const accountNamesInfo = transactionRes.transactions
            .filter(transaction => (transaction.lifecycle.transaction_status === "executed" && transaction.lifecycle.pub_keys))
            .map(transaction => {
                const transactionItem = transaction.lifecycle;
                const accountName = transactionItem.execution_trace.action_traces[0].act.data.name;
                return accountName;
            });

        if (!accountNamesInfo || accountNamesInfo.length === 0) {
            res.status(404);
            res.send({ message: `Not found account from dfuse with account name ${accountName}` });
            return; // not sure if this is needed...
        }
        // get name from account name using mongodb
        orgInfo = await Promise.all(accountNamesInfo.map(async accountName => {
            const orgDoc = await accountController.findOne({ accountName: accountName });
            if (!orgDoc) {
                res.status(404);
                res.send({ message: `Not found account with account name ${accountName}` });
                return; // not sure if this is needed...
            }
            return { name: orgDoc.name, accountName: accountName }
        }))
    }

    const accountDocInfo = {
        accountType: accountDoc.accountType,
        name: accountDoc.name,
        organizations: orgInfo
    };

    const retObj = req.addBlockchainRes(accountDocInfo);
    res.send(retObj);
};