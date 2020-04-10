const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');
const copyObj = require('./objects');

// Only needed for nodejs execution
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');

class Eosio {
    async initializeEosio(account, network) {
        let accountCopy = copyObj(account);
        const signatureProvider = fetch
            ? new JsSignatureProvider([accountCopy.pkey], {fetch})
            : new JsSignatureProvider([accountCopy.pkey]);
        accountCopy.pubkey = ecc.privateToPublic(accountCopy.pkey);

        let rpc = new JsonRpc(network);

        const accountRes = await rpc.get_account(accountCopy.name);
        const permissions = accountRes.permissions.filter((permission) => {
            if (accountCopy.permission === permission.perm_name) {
                let keys = permission.required_auth.keys.filter((key) => {
                    if (key.key === accountCopy.pubkey) return true;
                    return false;
                })
                if (keys.length && keys.length > 0) return true;
            }
            return false;
        });
        if (!(permissions.length) || permissions.length !== 1) throw Error("Permission " + accountCopy.permission + " with account " + accountCopy.name + " was not found");

        delete accountCopy.pkey;
        this.account = accountCopy;
        this.network = network;

        let api = TextEncoder
            ? new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
            : new Api({ rpc, signatureProvider });

        this.api = api;
        this.rpc = rpc;

        this.getTable = async function(code, scope, table) {
            return await rpc.get_table_rows({
                json: true,
                code: code,
                scope: scope,
                table: table,
                limit: 10,
                reverse: false,
                show_payer: false
            });
        }
        
        this.transact = async function(receiver, action, data, options) {
            try {
                const tx = await api.transact({
                    actions: [{
                        account: receiver,
                        name: action,
                        authorization: [{
                            actor: account.name,
                            permission: account.permission,
                    }],
                    data: data,
                    }]}, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                  }
                )
                if (options) {
                    if (tx.processed.error_code) throw Error("Failed with error code: " + tx.processed.error_code);
                    if (tx.processed.receipt.status !== options.status) throw Error("Tx status is " + tx.processed.receipt.status);
                }
                return tx;
            } catch (e) {
                console.log('\nCaught exception: ' + e);
                if (e instanceof RpcError)
                  console.error(JSON.stringify(e.json, null, 2));
                else
                    throw Error(e);
            }
        }
    }
}

module.exports = Eosio