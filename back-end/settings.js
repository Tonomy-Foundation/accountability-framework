// these settings are used on npm start
const settings = {
    eosio: {
        nodeos: "http://localhost:8888",
    },
    dfuseOptions: dfuseOptions = {
        apiKey: "web_abcdef123456789",
        authUrl: "null://",
        secure: false,
        network: "localhost:8080"
    },
    mongodb: {
        url: "mongodb://localhost:27017/conscious_dev"
    },
    port: 4001,
    env: "development"
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.env = "production";
    settings.eosio.nodeos = "http://dfuse:8888";
    settings.dfuseOptions.network = "dfuse:8080";
    settings.mongodb.url = "mongodb://mongodb:27017/conscious_prod";
} else if (process.env.REACT_APP_NODE_ENV === "docker") {
    settings.env = "docker";
    settings.eosio.nodeos = "http://dfuse:8888";
    settings.dfuseOptions.network = "dfuse:8080";
    settings.mongodb.url = "mongodb://mongodb:27017/conscious_dev";
    settings.port = 4000
}

settings.isLiveEnvironment = function() {
    return settings.env === "production";
}

module.exports = settings;