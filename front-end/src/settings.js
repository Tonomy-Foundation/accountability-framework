// these settings are used on npm start
let settings = {
    // TODO rename to api.url
    eosio: {
        network: "http://localhost:4000",
        accounts: {
            jack: {
                pkey: "5K5cPZHgJaFHWt3Fy4vgzc2WfLw3cLE4E1x5c6A2kx1pjL3mEg4",
                pubkey: "EOS7Jj43XvkrBiNw8Q6zUECcGK9ktbMv8jz6Vjn1qAid93389mEgr"
            }
        }
    }
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.eosio.network = "http://ec2-35-178-206-104.eu-west-2.compute.amazonaws.com:8888";
} else if (process.env.REACT_APP_NODE_ENV === "docker") {
    //
}

export default settings;