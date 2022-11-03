import Validators from './models/validators.js'
import Nominators1kv from './models/nominators-1kv.js'
import Nominators from './models/nominators.js'
import Pools from './models/pools.js'
import Candidates from './models/candidate.js'
import Exposures from './models/exposures.js'
import Accounts from './models/account.js'
import Onet from './models/onet.js'
import { identity } from './models/identity.js'
import { parseIdentity, asyncForEach } from './utils.js'
import { hexToString } from '@polkadot/util'

const resolvers = {
  Query: {

    ChainProperties: async (_, args) => {
      console.log('ChainProperties', args)
      var { chain = 'kusama' } = args
      var res = await substrate.api[chain].registry.getChainProperties()
      var ret = JSON.parse(res.toString())
      ret.chain = chain
      ret.tokenDecimals = ret.tokenDecimals[0]
      ret.tokenSymbol = ret.tokenSymbol[0]
      // console.log('ret', ret)
      return ret
    },

    Constants: async (_, args) => {
      console.log('Constants', args)
      var { chain = 'kusama', section = null } = args
      var ret = {}
      switch (section) {
        case 'balances':
          ret.balances = {
            existentialDeposit: (await substrate.api[chain].consts[section].existentialDeposit).toNumber(),
            maxLocks: await substrate.api[chain].consts[section].maxLocks,
            maxReserves: await substrate.api[chain].consts[section].maxReserves
          }
          break
        case '':
          break
      }
      // var ret = JSON.parse(res.toString())
      // ret.chain = chain
      // ret.tokenDecimals = ret.tokenDecimals[0]
      // ret.tokenSymbol = ret.tokenSymbol[0]
      // // console.log('ret', ret)
      return ret
    },

    Account: async (_, args) => {
      console.log('Account', args)
      var { chain = 'kusama', accountId = null } = args
      const acc = await substrate.api[chain].query.system.account(accountId)
      // var ret = { chain, era, stash }
      var account = acc.toJSON()
      account.accountId = accountId
      console.log('result', account)
      return account
    },
    Accounts: async (_, args) => {
      var { chain = 'kusama', ids = null } = args
      const accounts = await substrate.api[chain].query.system.account.multi(ids)
      return accounts.toJSON()
    },

    Candidate: async (_, args) => {
      console.log('Candidate', args)
      const { chain = 'kusama', stash = null } = args
      return await Candidates.findOne({chain, stash})
    },
    Candidates: async (_, args) => {
      console.log('Candidates', args)
      const { chain = 'kusama', stashes = null, search = null, offset = 0, limit = 0 } = args;
      var crit = { chain }
      if (stashes) crit.stash = { '$in': stashes }
      if (search) crit.name = { $regex: new RegExp(search, 'i') }
      return await Candidates.find(crit).skip(offset).limit(limit)
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

    Identity: async (_, args) => {
      console.log('Identity', args)
      var { chain = 'kusama', accountId = null } = args
      const _id = await substrate.api[chain].query.identity.identityOf(accountId)
      var id = parseIdentity(_id) || {}
      id.accountId = accountId
      id.chain = chain
      // console.log('id', id)
      // const _parent = await substrate.api[chain].query.identity.superOf(accountId)
      // console.log('parent', _parent.toString())
      // if(_parent.toString()) {
      //   const [parentId, subId] = _parent.toJSON() || []
      //   // console.log('parentId, subId', parentId, hexToString(subId.raw))
      //   const _pid = await substrate.api[chain].query.identity.identityOf(parentId)
      //   const pid = parseIdentity(_pid)
      //   // console.log('pid', pid)
      //   pid.accountId = parentId.toString()
      //   id.chain = chain
      //   id.accountId = accountId
      //   id.subId = hexToString(subId.raw)
      //   id.parentIdentity = pid
      // }
      // var ret = { chain, era, stash }
      return id
    },
    Identities: async (_, args) => {
      // console.log('Identities', args)
      var { chain = 'kusama', ids = null } = args
      const res = await substrate.api[chain].query.identity.identityOf.multi(ids)
      // console.log(res[0].toJSON())
      var ret = []
      res?.forEach((m, idx) => {
        let id = parseIdentity(m) || {}
        if (id) id.accountId = ids[idx]; else id = { accountId: ids[idx] }
        id.chain = chain
        ret.push(id)
      })
      return ret
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

    Validator: async (_, args) => {
      console.log('Validator', args)
      const { chain = 'kusama', stash = null } = args
      const result = await Validators.findOne({chain, stash})
      // console.log('result', result)
      // result.nominatorIds = result.nominators
      // delete result.nominators
      return result
    }, 
    ValidatorCount: async (_, args) => {
      console.log('Validators', args)
      const { chain = 'kusama', search = null } = args;
      var crit = { chain }
      if ( search ) crit.name = { $regex: new RegExp(search, 'i') }
      console.log('crit', crit)
      const count = await Validators.count(crit)
      return count
    },
    Validators: async (_, args) => {
      console.log('Validators', args)
      const { chain = 'kusama', stashes = null, search = null, offset = 0, limit = 50 } = args;
      // return datasources.validators.getValidators() // s.getValidator,
      var crit = { chain }
      if ( stashes ) crit.stash = { '$in': stashes }
      if ( search ) crit.name = { $regex: new RegExp(search, 'i') }
      console.log('crit', crit)
      // const count = await Validators.count(crit)
      const records = await Validators.find(crit).skip(offset).limit(limit)
      // console.log('total', count, 'found', records.length)
      return records
    },

  },
  Candidate: {
    identity: async (candidate, _) => {
      // console.log('Candidate.identity', candidate)
      var { chain, stash } = candidate
      const _id = await substrate.api[chain].query.identity.identityOf(stash)
      var id = parseIdentity(_id) || {}
      id.chain = chain
      id.accountId = stash
      // console.log('id', id)
      // const _parent = await substrate.api[chain].query.identity.superOf(stash)
      // // console.log('parent', _parent.toString())
      // if(_parent.toString()) {
      //   var [parentId, subId] = _parent.toJSON() || []
      //   // console.log('parentId, subId', parentId, hexToString(subId.raw))
      //   const _pid = await substrate.api[chain].query.identity.identityOf(parentId)
      //   const pid = parseIdentity(_pid)
      //   id.sub_id = hexToString(subId.raw)
      //   id.parent_identity = pid
      // }
      return id
    }
  },
  Identity: {
    parentIdentity: async (identity, _) => {
      console.log('Identity.parentIdentity()', identity)
      const { chain, accountId } = identity
      // const val = await Candidates.findOne(crit)
      const _parent = await substrate.api[chain].query.identity.superOf(accountId)
      console.log('parent', _parent.toString())
      var pid = {}
      pid.chain = chain
      if(_parent.toString()) {
        var [parentId, subId] = _parent.toJSON() || []
        // console.log('parentId, subId', parentId, hexToString(subId.raw))
        const _pid = await substrate.api[chain].query.identity.identityOf(parentId)
        pid = parseIdentity(_pid)
        console.log('pid', pid)
        //if (!pid) pid = {}
        pid.chain = chain
        pid.accountId = parentId.toString()
        pid.subId = hexToString(subId.raw)
        // id.parent_identity = pid
      }
      console.log('pid', pid)
      return pid
    },
  },
  Validator: {
    // nominators: (validator, _, { dataSources: { Nominators } }) => {
    nominators: async (validator, args) => {
      // const { chain = 'kusama', stashes = null, search = null, offset = 0, limit = 50 } = args;
      // console.log('woo hoo', validator, chain)
      var crit = { chain: validator.chain }
      crit.accountId = {'$in': validator?.nominators || [] }
      console.debug('crit', crit)
      const noms = await Nominators.find(crit)
      return noms
    },
    identity: async (validator, _) => {
      var { chain, stash } = validator
      const _id = await substrate.api[chain].query.identity.identityOf(stash)
      var id = parseIdentity(_id) || {}
      id.chain = chain
      id.accountId = stash
      return id
    },
    is1kv: async (validator, _) => {
      const crit = { chain: validator.chain, stash: validator.stash }
      const val = await Candidates.findOne(crit)
      return val
    },
    onet: async (validator, _) => {
      const crit = { chain: validator.chain, stash: validator.stash }
      const onets = await Onet.find(crit).sort({to_era: 1}).limit(50)
      return onets
    }
  },
  Nominator: {
    account: async (nominator, args) => {
      // console.log('Nominator.account()', nominator, args)
      const chain = nominator.chain
      const acc = await substrate.api[chain].query.system.account(nominator.accountId)
      var account = acc.toJSON()
      // here it's part of the parent, so we don't need to set the accountId in the account
      // account.accountId = nominator.accountId
      // console.log('result', account)
      return account
    },
    is1kv: async (nominator, _) => {
      const crit = { chain: nominator.chain, address: nominator.accountId }
      const nom = await Nominators1kv.findOne(crit)
      return nom
    },
    targetIds: async (nominator, _) => {
      return nominator.targets
    },
    targets: async (nominator, args) => {
      // console.log('Nominator.targets()', nominator, args)
      // const { chain = 'kusama' } = args;
      var crit = { chain: nominator.chain }
      const stashes = Array.from(new Set(nominator.targets)) //.map(m => m.accountId)
      crit.stash = { '$in': stashes }
      // console.log('crit', crit)
      const records = await Validators.find(crit) // .skip(offset).limit(limit)
      // console.log('found', records.length)
      return records
    }
  }
}

// module.exports = resolvers;
export default resolvers
