import Validators from './models/validators.js'
import Nominators from './models/nominators.js'
import Pools from './models/pools.js'
import Candidates from './models/candidate.js'
import Exposures from './models/exposures.js'

import { asyncForEach } from './utils.js'

const resolvers = {
  Query: {

    Validator: async (_, args) => {
      console.log('Validator', args)
      const { chain = 'kusama', stash = null } = args
      const result = await Validators.findOne({chain, stash})
      // console.log('result', result)
      return result
    }, // async (_, args) => {}),

    Validators: async (_, args) => {
      console.log('Validators', args)
      const { chain = 'kusama', stashes = null, search = null, offset = 0, limit = 50 } = args;
      // return datasources.validators.getValidators() // s.getValidator,
      var crit = { chain }
      if ( stashes ) crit.stash = { '$in': stashes }
      console.log('crit', crit)
      const count = await Validators.count(crit)
      const records = await Validators.find(crit).skip(offset).limit(limit)
      console.log('total', count, 'found', records.length)
      return records
    },

    Nominator: async (_, args) => {
      console.log('Nominator', args)
      const { chain = 'kusama', accountId = null } = args
      const result = await Nominators.findOne({chain, accountId})
      // console.log('result', result)
      return result
    },
    Nominators: async (_, args) => {
      console.log('Nominators', args)
      var { chain = 'kusama', ids = null, search = null, offset = 0, limit = 50 } = args;
      // return datasources.validators.getValidators() // s.getValidator,
      limit = Math.min(limit, 100)
      var crit = { chain }
      if ( ids ) crit.accountId = { '$in': ids }
      console.log('crit', crit)
      const count = await Nominators.count(crit)
      const records = await Nominators.find(crit).skip(offset).limit(limit)
      console.log('total', count, 'found', records.length)
      return records
    },

    Pool: async (_, args) => {
      console.log('Pool', args)
      const { chain = 'kusama', id = null } = args
      const result = await Pools.findOne({chain, id})
      // console.log('result', result)
      return result
    },
    // PoolMembers: async (_, args) => {
    //   console.log('PoolMembers', args)
    //   var { chain = 'kusama', id = null, offset = 0, limit = 50 } = args;
    //   // limit = Math.min(limit, 100)
    //   var crit = { chain, targets: id }
    //   // if ( ids ) crit.accountId = { '$in': ids }
    //   console.log('crit', crit)
    //   const count = await Nominators.count(crit)
    //   const records = await Nominators.find(crit).skip(offset).limit(limit)
    //   console.log('total', count, 'found', records.length)
    //   return records
    // },

    Pools: async (_, args) => {
      console.log('Pools', args)
      var { chain = 'kusama', ids = null, search = null, offset = 0, limit = 50 } = args;
      // limit = Math.min(limit, 100)
      var crit = { chain }
      if ( ids ) crit.accountId = { '$in': ids }
      console.log('crit', crit)
      const count = await Pools.count(crit)
      const records = await Pools.find(crit).sort({id: 1}).skip(offset).limit(limit)
      console.log('total', count, 'found', records.length)
      return records
    },


    Exposure: async (_, args) => {
      console.log('Exposure', args)
      var { chain = 'kusama', era = null, stash = null } = args
      // const result = await Exposures.findOne({chain, era, stash})
      if (!era) {
        var activeEra = await substrate.api[chain].query.staking.activeEra()
        activeEra = activeEra.toJSON()
        era = activeEra.index
      }
      const entries = await substrate.api[chain].query.staking.erasStakers.entries(era);
      var ret = { chain, era, stash }
      await asyncForEach(entries, async ([key, exposure]) => {
        const [era, accountId] = key.args
        if (accountId.toString() === stash) {
          ret = {...ret, ...exposure.toJSON()}
        }
      })
      // console.log('result', result)
      return ret
    },
    Exposures: async (_, args) => {
      console.log('Exposures', args)
      var { chain = 'kusama', era = null, stashes = null } = args;
      // return datasources.validators.getValidators() // s.getValidator,
      // limit = Math.min(limit, 100)
      var crit = { chain, era }
      if (!era) {
        var activeEra = await substrate.api[chain].query.staking.activeEra()
        activeEra = activeEra.toJSON()
        era = activeEra.index
      }
      if ( stashes ) crit.stash = { '$in': stashes }
      console.log('crit', crit)
      // const count = await Exposures.count(crit)
      // const records = await Exposures.find(crit) //.skip(offset).limit(limit)
      const entries = await substrate.api[chain].query.staking.erasStakers.entries(era);
      console.log('entries:', entries.length)
      var ret = []
      await asyncForEach(entries, async ([key, exposure]) => {
        const [era, accountId] = key.args
        var rec = exposure.toJSON()
        rec.chain = chain
        rec.era = era.toNumber()
        rec.stash = accountId.toString()
        ret.push(rec)
      })
      // console.log('total', count, 'found', records.length)
      // return result.toJSON()
      return ret
    },


    Candidate: async (_, args) => {
      console.log('Candidate', args)
      const { chain = 'kusama', stash = null } = args
      return await Candidates.findOne({chain, stash})
    },
    Candidates: async (_, args) => {
      console.log('Candidates', args)
      const { chain = 'kusama', search = null, offset = 0, limit = 0 } = args;
      return await Candidates.find({chain}).skip(offset).limit(limit)
    },

  },
  Validator: {
    // nominators: (validator, _, { dataSources: { Nominators } }) => {
    //   console.log('woo hoo', validator)
    //   return Nominators.getNominators(validator.targets)
    // }
  },
  Nominator: {
    // targets: (nominator, _, { dataSources: { Validators } }) => Validators.getValidator(nominator.accountId)
  }
}

// module.exports = resolvers;
export default resolvers
