import { hexToString } from '@polkadot/util'

const identity = {

  parseIdentity: function (id) {
    const idj = id.toJSON()
    // console.debug('idj', idj)
    if (idj) {
      return {
        deposit: idj.deposit,
        info: {
          // additional...
          display: idj.info.display.raw ? hexToString(idj.info.display.raw) : '',
          email: idj.info.email.raw ? hexToString(idj.info.email.raw) : '',
          // image...
          legal: idj.info.legal.raw ? hexToString(idj.info.legal.raw) : '',
          riot: idj.info.riot.raw ? hexToString(idj.info.riot.raw) : '',
          twitter: idj.info.twitter.raw ? hexToString(idj.info.twitter.raw) : '',
          web: idj.info.web.raw ? hexToString(idj.info.web.raw) : ''
        },
        judgements: idj.judgements
      }
    } else {
      return null
    }
  },

  /**
   * @param {*} api 
   * @param {*} account - nominator has accountId, validator has stash
   * @param {*} identity 
   * @param {*} parent 
   * @returns 
   */
  constructId: async function (api, accountId, identity, parent) {
    if(identity.toJSON()) {
      console.log(`${accountId} has identity`)
      return parseIdentity(identity)
    }
    if(parent.toString()) {
      var [parentStash, subId] = parent.toJSON() || []
      if (parentStash) {
        console.log(`${accountId} has parent`)
        var parentIdentity = await api.query.identity.identityOf(parentStash)
        var idj = parentIdentity.toJSON()
        if (idj) {
          console.log(`${accountId} parent has identity`)
          return {
            subId: hexToString(subId.raw),
            parentIdentity: this.parseIdentity(parentIdentity)
          }
        } else {
          return null
        }
      }
    }
    return null
  }

}

export {
  identity
}
