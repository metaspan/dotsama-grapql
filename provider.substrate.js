
import { WsProvider, ApiPromise } from '@polkadot/api'
import { endpoints } from './endpoints.js';
// const endpoint = 'parity'


export class SubstrateApiProvider {
  _endpoint = 'local'
  _providers = {
    // kusama: new WsProvider(endpoints['kusama'][this._endpoint]),
    // polkadot: new WsProvider(endpoints['polkadot'][this._endpoint])
  }
  api = {
    // kusama: any
    // polkadot: Promise<ApiPromise>
  }

  constructor(endpoint = 'local') {
    console.debug('SubstrateApiProvider.constructor()', endpoint)
    this._endpoint = endpoint
  }

  async connect() {
    console.debug('SubstrateApiProvider.connect()', this._endpoint)
    try {
      this._providers = {
        kusama: new WsProvider(endpoints['kusama'][this._endpoint]),
        polkadot: new WsProvider(endpoints['polkadot'][this._endpoint])
      }
      this.api = {
        kusama: await ApiPromise.create({ provider: this._providers.kusama }),
        polkadot: await ApiPromise.create({ provider: this._providers.polkadot })
      }
      return true  
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async disconnect() {
    try {
      await this.api['kusama'].disconnect()
    } catch (err) {
      console.log(err)
    }
    try {
      await this.api['polkadot'].disconnect()
    } catch (err) {
      console.log(err)
    }
  }

}
