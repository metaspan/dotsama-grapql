import { gql } from 'apollo-server'
import BigInt from 'graphql-bigint'

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

const typeDefs = gql`

scalar BigInt

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  # books: [Book]
  ChainProperties(chain: String!): ChainProperties
  Constants(chain: String!, section: String!): Constants
  Account(chain: String!, accountId: String): Account
  Accounts(chain: String!, ids: [String]): [Account]
  Candidate(chain: String!, stash: String): Candidate
  Candidates(chain: String!, stashes: [String], offset: Int, limit: Int, search: String): [Candidate]
  Exposure(chain: String!, era: Int, stash: String!): Exposure
  Exposures(chain: String!, era: Int, stashes: [String]): [Exposure]
  Identity(chain: String!, accountId: String!): Identity
  Identities(chain: String!, ids: [String]): [Identity]
  Nominator(chain: String!, accountId: String): Nominator
  Nominators(chain: String!, ids: [String], offset: Int, limit: Int, search: String): [Nominator]
  Pool(chain: String!, id: Int): Pool
  PoolMembers(chain: String!, id: Int): [Nominator]
  Pools(chain: String!, ids: [Int], offset: Int, limit: Int, search: String): [Pool]
  Validator(chain: String!, stash: String): Validator
  ValidatorCount(chain: String!, search: String): Int
  Validators(chain: String!, stashes: [String], offset: Int, limit: Int, search: String): [Validator]
}

type AccountData {
  free: BigInt
  reserved: BigInt
  miscFrozen: BigInt
  feeFrozen: BigInt
}

type Account {
  accountId: String!
  identity: Identity
  nonce: Int
  consumers: Int
  providers: Int
  sufficients: Int
  data: AccountData
}

type ConstantsBalances {
  existentialDeposit: BigInt # u128
  maxLocks: Int    # u32
  maxReserves: Int # u32
}
type Constants {
#  alliance
#  assets
#  authorship
#  babe
#  bagsList
  balances: ConstantsBalances
#  bounties
#  childBounties
#  contracts
#  convictionVoting
#  democracy
#  electionProviderMultiPhase
#  elections
#  gilt
#  grandpa
#  identity
#  imOnline
#  indices
#  lottery
#  multisig
#  nominationPools
#  proxy
#  rankedPolls
#  recovery
#  referenda
#  scheduler
#  society
#  staking
#  stateTrieMigration
#  system
#  timestamp
#  tips
#  transactionPayment
#  treasury
#  uniquesutility
#  vesting
}

type ChainProperties {
  chain: String
  ss58Format: Int
  tokenDecimals: Int
  tokenSymbol: String
}

type Candidate {
  chain: String!
  stash: String!
  name: String
  discoveredAt: String
  nominatedAt: String
  offlineSince: Int
  offlineAccumulated: Int
  rank: Int
  faults: Int
  invalidityReasons: String
  unclainedEras: [String]
  inclusion: Float
  kusamaStash: String
  commission: Int
  # identity: ''
  active: Boolean
  valid: Boolean
  validity: [CandidateValidity]
  # score: ''
  total: Float
  location: String
  councilStake: Float
  councilVotes: [String]
  democractVoteCount: Int
  democracyVotes: [Int]
  stale: Boolean
  updatedAt: String
  identity: Identity
  onet: [Onet]
}

type CandidateValidity {
  valid: Boolean
  type: String
  details: String
  updated: BigInt
}

type ExposureOther {
  who: String
  value: Float
}

type Exposure {
  chain: String!,
  era: Int!,
  stash: String!,
  total: Float,
  own: Float,
  others: [ExposureOther],
  updatedAt: String
}

type Judgement {
  any: String
}

type IdentityInfo {
  display: String
  email: String
  legal: String
  riot: String
  twitter: String
  web: String
}

type Identity {
  chain: String!
  accountId: String
  deposit: BigInt
  info: IdentityInfo
  judgements: [Judgement]
  subId: String
  parentIdentity: Identity
}

type Nominator {
  chain: String!
  accountId: String!
  account: Account
  controllerId: String
  identity: Identity
  targetIds: [String]
  targets: [Validator]
  updatedAt: String
  is1kv: Nominator1kv
}

type Nominator1kvIdentity {
  name: String
  sub: String
  verified: Boolean
  _id: String
}

type Nominator1kvCurrent {
  name: String
  stash: String
  identity: Nominator1kvIdentity
}

type Nominator1kv {
  chain: String
  address: String
  stash: String
  proxy: String
  bonded: Float
  avgStake: Float
  current: [Nominator1kvCurrent]
  lastNomination: Float
  nominationAmount: Float
  newBondedAmount: Float
  rewardDestination: String
  createdAt: BigInt
  updatedAt: String
}

type Onet {
  chain: String
  from_era: Int
  to_era: Int
  from_session: Int
  to_session: Int
  from_block: Int
  to_block: Int
  seq: Int
  validator: String
  stash: String
  subset: String
  active_sessions: Int
  pv_sessions: Int
  authored_blocks: Int
  core_assignments: Int
  implicit_votes: Int
  explicit_votes: Int
  missed_votes: Int
  grade: String
  mvr: Float
  avg_ppts: Float
  score: Float
  commission: Int
  commission_score: Float
  timeline: String
  updatedAt: String
}

type Pool {
  chain: String!
  id: Int!
  state: String
  points: Float
  claimable: Float
  name: String
  members: [PoolMember]
  memberCounter: Int
  balance: Float
  totalEarnings: Float
}

type PoolMember {
  accountId: String!
  points: Float
}

type ValidatorPrefs {
  commission: Int
  blocked: Boolean
}

type Validator {
  chain: String!
  stash: String!
  shortStash: String
  name: String
  identity: Identity
  prefs: ValidatorPrefs
  # nominatorIds: [String] # NOT [Nominators] !!!
  nominators: [Nominator] # NOT [Nominators] !!!
  updatedAt: String
  is1kv: Candidate
  onet: [Onet]
}

# NOT USED ... !!
type User {
  """
  User ID.
  """
  id: ID!

  """
  User's first name.
  """
  firstName: String!

  """
  User's last name.
  """
  lastName: String!

  # User's e-mail address.
  # email: TODO: Define type.

  """
  Posts published by user.
  """
  posts: [Post]

  """
  Users that this user is following.
  """
  following: [User]

  """
  Users that this user is followed by.
  """
  followers: [User]
}

type Post {
  id: ID!
}
`

export default typeDefs
