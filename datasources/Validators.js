import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class ValidatorSource extends MongoDataSource {

  // constructor(connection) {
  //   console.log('datasources/Validators.js: constructor()')
  //   super(connection)
  // }

  getValidator(stash) {
    console.log('datasources/Validators.js: getValidator()', stash)
    const ret = this.findByFields({stash})
    return ret[0]
  }

  /**
   * return targets, typically for a nominator
   * @param {*} stashes 
   * @returns 
   */
  getValidators(stashes) {
    console.log('datasources/Validators.js: getValidators()', stashes)
    return this.findByFields({stash: stashes})
  }

  // getNominators(stash) {
  //   console.log('datasources/Validators.js: getNominators()', stash)
  //   const model = this.findOneByFields({stash})
  //   return model[0].nominators || []
  // }
}
