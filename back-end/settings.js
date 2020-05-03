let settings = {
  eosio: {
    network: null,
    accounts: {
      eosio: {
        pkey: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
        pubkey: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
      },
      jack: {
        pkey: "5K5cPZHgJaFHWt3Fy4vgzc2WfLw3cLE4E1x5c6A2kx1pjL3mEg4",
        pubkey: "EOS7Jj43XvkrBiNw8Q6zUECcGK9ktbMv8jz6Vjn1qAid93389mEgr"
      },
      kirsten: {
        pkey: "5Kbbe6k8TT5ejHVvy4iiy2qQvt3MF43oMF7j6GqiQ6FHRT1fVLz",
        pubkey: "EOS57RkHk6FVCstEPJbm3ezfJ9wSGtKytvx4fZGj72qHEbHvQjy4j"
      },
      matej: {
        pkey: "5JJY2YCoMRVVFrYv8SffzdjcvVneFqHWKRz2DsZRBfEZjRWNgEM",
        pubkey: "EOS59cUZp45bh7hX2Q6V9ebCdBShQXmr14ANG1VZ55mESLipeCsCE"
      },
      yvo: {
        pkey: "5KHnMjLZ1jk2ScP4eGHufa8S6SJUSJWTpUqKgsGycVGxHZDCidB",
        pubkey: "EOS7bNT2DxZVdH2kEoZFkeuWA5KoT5koDW8aeSzczPHSF4EX8WxQs"
      }
    }
  },
  URL: {
    mongodb: "mongodb://127.0.0.1:27017/eosio"
  }
};

if (process.env.NODE_ENV === "production") {
  settings.eosio.network = process.env.SERVER_DOMAIN + ":8888";
  settings.URL.mongodb = "mongodb://" + process.env.SERVER_DOMAIN + process.env.DB_NAME + ":27017";
} else if (process.env.NODE_ENV === "test") {
  settings.eosio.network = "http://localhost:8888";
} else {
  // Use name from docker compose
  settings.eosio.network = "http://localhost:8888";
}

module.exports = settings;