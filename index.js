import 'dotenv/config'

// import { ApolloServer, gql } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import { Registry } from 'prom-client';
// import prometheusPlugin from '@thecodenebula/apollo-prometheus-plugin';
import { createPrometheusExporterPlugin } from '@bmatei/apollo-prometheus-exporter';
import express from 'express';
//import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';

// const { environment } = require('./environment.ts');
// import { mongoDbProvider } from './provider.mongodb';
import { SubstrateApiProvider } from './provider.substrate.js'
const ENDPOINT = 'local' // 'parity'
// make this available globally
global.substrate = new SubstrateApiProvider(ENDPOINT)

import typeDefs from './type-defs.graphql.js'
import resolvers from './resolvers.js'
// import datasources from './datasources/index.js';

const PORT = 4001

;(async () => {

  // // await mongoDbProvider.connectAsync(environment.mongoDb.databaseName)
  // const client = new MongoClient(process.env.MONGODB_URL + '/' + process.env.MONGODB_DB_NAME)
  // client.connect()

  try {
    await mongoose.connect(process.env.MONGODB_URL + '/' + process.env.MONGODB_DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000
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

  // Prometheus metrics
  const register = new Registry();
  const app = express();
  //app.use(cors())
  // app.get('/metrics', (_, res) => res.send(register.metrics()));
  const prometheusExporterPlugin = createPrometheusExporterPlugin({ app });
  const corsOptions = {
    //origin: ["https://metaspan.io"]
    origin: ["*"]
  };

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    // introspection: environment.apollo.introspection,
    resolvers,
    // datasources,
    cors: corsOptions,
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
      // prometheusPlugin.prometheusPlugin(register, { enableNodeMetrics: true }),
      prometheusExporterPlugin
    ],
  });

  // // The `listen` method launches a web server.
  // server.listen({host: '0.0.0.0', port: 4000}).then(({ url }) => {
  //   console.log(`🚀  Server ready at ${url}`);

  //   process.on('SIGINT', async () => {
  //     console.log('\nSIGINT, shutting down...')
  //     // client.close()
  //     await mongoose.disconnect()
  //     await substrate.disconnect()
  //     process.exit(0)
  //   })
  // });
  await server.start();
  server.applyMiddleware({app})
  const httpServer = http.createServer(app);
  // await new Promise(resolve => httpServer.listen({ host: '0.0.0.0', port: 4000 }, resolve));
  await new Promise(resolve => httpServer.listen(PORT, '0.0.0.0', null, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

})();
