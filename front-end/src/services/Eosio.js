import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';
import { copyObj } from './objects';
import EosioMyApi from './EosioMyApi';
import { createDfuseClient } from '@dfuse/client';
import settings from '../settings';

class Eosio {
    constructor(network = { nodeos: settings.eosio.nodeos, dfuse: settings.eosio.dfuse }) {
        let rpc = fetch ? new JsonRpc(network.nodeos, {fetch}) : new JsonRpc(network.nodeos);
        this.rpc = rpc;
        this.dfuseClient = createDfuseClient({
            apiKey: "web_abcdef123456789",
            authUrl: "null://",
            secure: false,
            network: network.dfuse,
        })

        console.log(this.dfuseClient)
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

export default Eosio