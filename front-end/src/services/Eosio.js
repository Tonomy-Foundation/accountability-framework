import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';
import { copyObj } from './objects';
import EosioMyApi from './EosioMyApi';

import settings from '../settings';
const defaultNetwork = settings.eosio.network;

class Eosio {
    constructor(network = defaultNetwork) {
        let rpc = fetch ? new JsonRpc(network, {fetch}) : new JsonRpc(network);
        this.rpc = rpc;
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