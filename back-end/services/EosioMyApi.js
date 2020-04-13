const { RpcError } = require('eosjs');
const fs = require('fs');
const path = require('path');

class EosioMyApi {
    constructor(rpc, api, accountCopy) {
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
                            actor: accountCopy.name,
                            permission: accountCopy.permission,
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

        this.deploy = async function(account, folder, wasm, abi) {
            const wasmFile = fs.readFileSync(path.join(__dirname, folder + "/" + wasm));
            const abiFile = fs.readFileSync(path.join(__dirname, folder + "/" + abi));
            
            console.log(abiFile)
            try {
                if (accountCopy.name !== account) throw Error("Must deploy contract using contract account " + account);
                const tx = await api.transact({
                    actions: [{
                        account: account,
                        name: "setcode",
                        authorization: [{
                            actor: accountCopy.name,
                            permission: accountCopy.permission,
                        }],
                        data: {
                            account: account,
                            vmtype: 0,
                            vmversion: 0,
                            code: wasmFile
                        },
                    }, {
                        account: account,
                        name: "setabi",
                        authorization: [{
                            actor: accountCopy.name,
                            permission: accountCopy.permission,
                        }],
                        data: {
                            account: account,
                            abi: abiFile
                        },
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

module.exports = EosioMyApi;