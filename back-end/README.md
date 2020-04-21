# NodeJS back end for blockchain

This application acts as a middleware between front end (React) and eosio blockchain.

We could do the data manipulation here so that we won't be doing it in React.

## Development

This application is bootstrapped with [express generator](https://expressjs.com/en/starter/generator.html).

### Running locally

Just run `npm start` which will starts node application with auto reloading

### Adding a new route

There is already a dummy route specified which is `users`.
If you want to add a new route, create a new file in `routes` folder and refer it in `app.js`
