# dotsama-grapql
Graphql enspoint for Polkadot &amp; Kusama

## Config

.env file with
```env
APOLLO_INTROSPECTION=true
APOLLO_PLAYGROUND=true
# MONGODB_DB_NAME=graphqlMongodbDemo
MONGODB_DB_NAME=mspn_io_api
# MONGODB_URL=mongodb://localhost:27017
MONGODB_URL=mongodb://mongo_user:mongo_passpass@localhost:27017/mongo_database
```

## Start

`node index.js`

or

`pm2 start --name dotsama-graphql index.ys`
