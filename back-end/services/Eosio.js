const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');
const { copyObj } = require('./objects');
const EosioMyApi = require('./EosioMyApi');
const { createDfuseClient } = require('@dfuse/client');

// Only needed for nodejs execution for eosjs and @dfuse/client
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const ws = require('ws');

const settings = require('../settings');

class Eosio {
    constructor(network = { nodeos: settings.eosio.nodeos, dfuseOptions: settings.dfuseOptions }) {
        let rpc = fetch ? new JsonRpc(network.nodeos, {fetch}) : new JsonRpc(network.nodeos);
        this.rpc = rpc;
        if (settings.isLiveEnvironment()) settings.secure = true;
        if (fetch) {
            dfuseOptions.httpClientOptions = {
                fetch: fetch
            }
        }
        if (ws) {
            dfuseOptions.graphqlStreamClientOptions = {
                socketOptions: {
                    // The WebSocket factory used for GraphQL stream must use this special protocols set
                    // We intend on making the library handle this for you automatically in the future,
                    // for now, it's required otherwise, the GraphQL will not connect correctly.
                    webSocketFactory: (url) => ws(url, ["graphql-ws"])
                }
            }
            dfuseOptions.streamClientOptions = {
                socketOptions: {
                    webSocketFactory: (url) => ws(url)
                }
            }
        }
        this.dfuseClient = createDfuseClient(dfuseOptions);
    }

    async login(account) {
        let accountCopy = copyObj(account);

        const signatureProvider = new JsSignatureProvider([accountCopy.pkey]);
        accountCopy.pubkey = ecc.privateToPublic(accountCopy.pkey);

        // const accountRes = await this.rpc.get_account(accountCopy.name);
        // const permissions = accountRes.permissions.filter((permission) => {
        //     if (accountCopy.permission === permission.perm_name) {
        //         let keys = permission.required_auth.keys.filter((key) => {
        //             if (key.key === accountCopy.pubkey) return true;
        //             return false;
        //         })
        //         if (keys.length && keys.length > 0) return true;
        //     }
        //     return false;
        // });
        // if (!(permissions.length) || permissions.length !== 1) throw Error("Permission " + accountCopy.permission + " with account " + accountCopy.name + " was not found");

        delete accountCopy.pkey;
        this.account = accountCopy;
        const rpc = this.rpc;

        let api = TextEncoder
            ? new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
            : new Api({ rpc, signatureProvider });

        this.api = api;

        this.myapi = new EosioMyApi(rpc, api, accountCopy);
    }
}

module.exports = Eosio