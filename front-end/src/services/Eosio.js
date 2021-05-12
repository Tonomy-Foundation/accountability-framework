import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';
import { copyObj } from './objects';
import EosioMyApi from './EosioMyApi';
import { createDfuseClient } from '@dfuse/client';
import settings from '../settings';

class Eosio {
    constructor(network = { nodeos: settings.eosio.nodeos, dfuseOptions: settings.dfuseOptions }) {
        let rpc = fetch ? new JsonRpc(network.nodeos, { fetch }) : new JsonRpc(network.nodeos);
        this.rpc = rpc;
        this.dfuseClient = createDfuseClient(network.dfuseOptions)
    }

    async login(account) {
        let accountCopy = copyObj(account);

        const signatureProvider = new JsSignatureProvider([accountCopy.pkey]);
        accountCopy.pubkey = ecc.privateToPublic(accountCopy.pkey);

        delete accountCopy.pkey;
        this.account = accountCopy;
        const rpc = this.rpc;

        let api = TextEncoder ?
            new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }) :
            new Api({ rpc, signatureProvider });

        this.api = api;

        this.myapi = new EosioMyApi(rpc, api, accountCopy);
    }
}

export default Eosio