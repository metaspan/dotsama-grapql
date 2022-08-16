import 'dotenv/config'

import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import mongoose from 'mongoose'

// const { environment } = require('./environment.ts');
// import { mongoDbProvider } from './provider.mongodb';
import { SubstrateApiProvider } from './provider.substrate.js'
const ENDPOINT = 'parity'
// make this available globally
global.substrate = new SubstrateApiProvider(ENDPOINT)

import typeDefs from './type-defs.graphql.js'
import resolvers from './resolvers.js'
// import datasources from './datasources/index.js';

(async () => {

  // // await mongoDbProvider.connectAsync(environment.mongoDb.databaseName)
  // const client = new MongoClient(process.env.MONGODB_URL + '/' + process.env.MONGODB_DB_NAME)
  // client.connect()

  try {
    await mongoose.connect(process.env.MONGODB_URL + '/' + process.env.MONGODB_DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // .then(() => console.log('connected to mongodb!'));
    console.log('connected to mongodb!')
  } catch (err) {
    console.error(err)
  }

  try {
    await substrate.connect()
    // api.kusama = await ApiPromise.create({ provider: providers.kusama })
    // api.polkadot = await ApiPromise.create({ provider: providers.polkadot })
    console.log('connected to substrate apis!')
  } catch (err) {
    console.error(err)    
  }

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    // introspection: environment.apollo.introspection,
    resolvers,
    // datasources,
    csrfPrevention: true,
    cache: 'bounded',
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
    **/
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

    // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);

    process.on('SIGINT', async () => {
      console.log('\nSIGINT, shutting down...')
      // client.close()
      await mongoose.disconnect()
      await substrate.disconnect()
      process.exit(0)
    })
  });

})();
