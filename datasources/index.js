import Validators from "./Validators.js"
import Nominators from "./Nominators.js"

const datasources = () => ({
  // users: new Users(client.db().collection('users')),
  validators: new Validators(client.db().collection('w3f_validator')),
  nominators: new Nominators(client.db().collection('w3f_nominator'))
})

export default datasources
