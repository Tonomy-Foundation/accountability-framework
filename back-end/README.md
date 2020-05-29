# NodeJS back end for blockchain

This application acts as a middleware between front end (React) and eosio blockchain.

We could do the data manipulation here so that we won't be doing it in React.

### `npm start`

Runs the app in local development mode with auto reloading on port `4001`

### Adding a new route

There is already a dummy route specified which is `home.js`.
If you want to add a new route, create a new file in `routes` folder and refer it in `routes.js`

Routes that should not call the blockchain proxy should be added to the `blockchainPathBlacklist` list in `blockchainProxy.js`
Routes that extend the blockchain proxy and consume it's response and send it back to the FE should set `req.blockchainResSent = true` as shown in `routes/home.js`