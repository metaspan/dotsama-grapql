// const hexToString = require('@polkadot/api')
import { hexToString } from '@polkadot/util'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function shortStash (stash, len=6) {
  return `${stash.slice(0, len)}...${stash.slice(-len)}`
}

function parseIdentity(id) {
  // console.log('parseIdentity()', id ? id.toString() : id)
  if (!id) return null
  const idj = id.toJSON()
  // console.debug('idj', idj)
  if (idj) {
    const judgements = idj.judgements?.map(([idx, value]) => Object.keys(value) )[0] || []
    return {
      deposit: idj.deposit,
      info: {
        // additional...
        display: idj.info?.display?.raw ? hexToString(idj.info.display.raw) : '',
        email: idj.info?.email?.raw ? hexToString(idj.info.email.raw) : '',
        // image...
        legal: idj.info?.legal?.raw ? hexToString(idj.info.legal.raw) : '',
        riot: idj.info?.riot?.raw ? hexToString(idj.info.riot.raw) : '',
        twitter: idj.info?.twitter?.raw ? hexToString(idj.info.twitter.raw) : '',
        web: idj.info?.web?.raw ? hexToString(idj.info.web.raw) : ''
      },
      // judgements: idj.judgements
      judgements
    }
  } else {
    return null
  }
}

function getName (val) {
  var ret = ''
  if (val.identity) {
    if (val.identity.parent_identity) {
      ret = val.identity.parent_identity?.info?.display + '/' + val.identity.sub_id
    } else {
      ret = val.identity.info.display || val.stash
    }
  } else {
    ret = val.stash
  }
  return ret
}

function slog(text) {
  console.log(text)
}

export {
  asyncForEach,
  getName,
  shortStash,
  parseIdentity,
  slog
}
