let settings = {
    eosio: {
        network: null,
        accounts: {
            eosio: {
                pkey: process.env.PKEY_EOSIO,
                pubkey: process.env.KEY_EOSIO
            },
            jack: {
                pkey: process.env.PKEY_JACK,
                pubkey: process.env.KEY_JACK
            },
            kirsten: {
                pkey: process.env.PKEY_KIRSTEN,
                pubkey: process.env.KEY_KIRSTEN
            },
            matej: {
                pkey: process.env.PKEY_MATEJ,
                pubkey: process.env.KEY_MATEJ
            },
            yvo: {
                pkey: process.env.PKEY_YVO,
                pubkey: process.env.KEY_YVO
            }
        }
    }
};

if (process.env.NODE_ENV === "PROD") {
    settings.eosio.network = process.env.SERVER_DOMAIN + ":8888";
} else {
    // Use name from docker compose
    settings.eosio.network = "http://eosio:8888";
}

module.exports = settings;