let settings = {
    eosio: {
        nodeos: "http://localhost:4000",
        blockExplorerUrl: "localhost:8888",
        accounts: {
            jack: {
                pkey: "5K5cPZHgJaFHWt3Fy4vgzc2WfLw3cLE4E1x5c6A2kx1pjL3mEg4",
                pubkey: "EOS7Jj43XvkrBiNw8Q6zUECcGK9ktbMv8jz6Vjn1qAid93389mEgr"
            }
        }
    },
    dfuseOptions: {
        apiKey: "web_abcdef123456789",
        authUrl: "null://",
        secure: false,
        network: "localhost:4000"
    },
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.eosio.nodeos = "https://d1hxgr8mqh915l.cloudfront.net";
    settings.dfuseOptions.network = "";
    settings.eosio.blockExplorerUrl = "d1uzqj8k54wt9u.cloudfront.net";
    settings.dfuseOptions.network = "d1hxgr8mqh915l.cloudfront.net"
}

export default settings;