import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Nominators extends MongoDataSource {

  getNominator(accountId) {
    console.log('datasources/Nominators.js: getNominator()', accountId)
    return this.findOne({accountId})
  }

  getNominators(accountIds) {
    console.log('datasources/Nominators.js: getNominators()', accountIds)
    return this.findByFields({accountId: accountIds})
    // return model.targets || []
  }
}
