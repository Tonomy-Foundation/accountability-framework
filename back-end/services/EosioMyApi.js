const { RpcError } = require('eosjs');
const fs = require('fs');
const path = require('path');
const { Serialize } = require(`eosjs`);

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
                    if (options.status && tx.processed.receipt.status !== options.status) throw Error("Tx status is " + tx.processed.receipt.status);
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

        this.deploy = async function(account, contractDir, options) {
            const { wasmPath, abiPath } = getDeployableFilesFromDir(contractDir)
            
            const wasm = fs.readFileSync(wasmPath).toString(`hex`);
            const buffer = new Serialize.SerialBuffer({
                textEncoder: api.textEncoder,
                textDecoder: api.textDecoder,
            })

            let abi = JSON.parse(fs.readFileSync(abiPath, `utf8`))
            const abiDefinition = api.abiTypes.get(`abi_def`)
            // need to make sure abi has every field in abiDefinition.fields
            // otherwise serialize throws
            abi = abiDefinition.fields.reduce(
            (acc, { name: fieldName }) =>
                Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
            abi
            )
            abiDefinition.serialize(buffer, abi)

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
                            code: wasm
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
                            abi: Buffer.from(buffer.asUint8Array()).toString(`hex`)
                        },
                    }]}, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                  }
                )
                if (options) {
                    if (tx.processed.error_code) throw Error("Failed with error code: " + tx.processed.error_code);
                    if (options.status && tx.processed.receipt.status !== options.status) throw Error("Tx status is " + tx.processed.receipt.status);
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

function getDeployableFilesFromDir(dir) {
    const dirCont = fs.readdirSync(dir)
    const wasmFileName = dirCont.find(filePath => filePath.match(/.*\.(wasm)$/gi))
    const abiFileName = dirCont.find(filePath => filePath.match(/.*\.(abi)$/gi))
    if (!wasmFileName) throw new Error(`Cannot find a ".wasm file" in ${dir}`)
    if (!abiFileName) throw new Error(`Cannot find an ".abi file" in ${dir}`)
    return {
      wasmPath: path.join(dir, wasmFileName),
      abiPath: path.join(dir, abiFileName),
    }
  }

module.exports = EosioMyApi;