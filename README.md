# dotsama-grapql

Graphql endpoint for Polkadot &amp; Kusama

- Sandbox url: https://gql.metaspan.io
- Live api url: https://gql.metaspan.io/graphql


## Status

- 1KV Candidates - mongodb (cached 30 mins, from upstream api)
- Validators - mongodb
- Nominators - mongodb
- Pools - mongodb
- Exposures - substrate.api

## TODO

- other Objects in polkadot.js api...
- move the resolvers away from `mongodb` and onto `substrate.api`

## Config

Read the [endpoints.js](./endpoints.js) file to see what endpoints are available.
Edit this file to match your `local` nodes.

Create `.env` file with:
```env
APOLLO_INTROSPECTION=true
APOLLO_PLAYGROUND=true
MONGODB_DB_NAME=mspn_io_api
MONGODB_URL=mongodb://mongo_user:mongo_passpass@localhost:27017/mongo_database
ENDPOINT=local|parity|etc
```

## Start

`node index.js`

or

`pm2 start --name dotsama-graphql index.js`

## Use the api

http://localhost:4000

