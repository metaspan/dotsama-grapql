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
  CandidatesFeed(chain: String!, search: String, stashes: [String], active: Boolean
    valid: Boolean
    nominated_1kv: Boolean
    score: Int
    rank: Int,
    order: String, orderDir: String, limit: Int, cursor: String!): CandidatesFeedResponse
  Candidates(chain: String!, stashes: [String], offset: Int, limit: Int, search: String): [Candidate]
  Exposure(chain: String!, era: Int, stash: String!): Exposure
  Exposures(chain: String!, era: Int, stashes: [String]): [Exposure]
  Identity(chain: String!, accountId: String!): Identity
  Identities(chain: String!, ids: [String], search: String, offset: Int, limit: Int): [Identity]
  Nominator(chain: String!, accountId: String): Nominator
  Nominators(chain: String!, ids: [String], search: String, offset: Int, limit: Int): [Nominator]
  Nominators1kv(chain: String!, ids: [String], search: String, offset: Int, limit: Int): [Nominator1kv]
  Pool(chain: String!, id: Int): Pool
  PoolMembers(chain: String!, id: Int): [Nominator]
  Pools(chain: String!, ids: [Int], offset: Int, limit: Int, search: String): [Pool]
  Validator(chain: String!, stash: String): Validator
  ValidatorCount(chain: String!, search: String): Int
  Validators(chain: String!, stashes: [String], offset: Int, limit: Int, search: String): [Validator]
}

type CandidatesFeedResponse {
  cursor: String!
  Candidates: [Candidate]
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
  active: Boolean
  bonded: Float
  commission: Float
  controller: String
  convictionVoteCount: Int
  convictionVotes: [Int]
  coreCount: Int
  country: String
  cpu: String
  # councilStake: Float
  # councilVotes: [String]
  # democractVoteCount: Int
  # democracyVotes: [Int]
  discoveredAt: String
  faults: Int
  identity: Identity
  implementation: String
  inclusion: Float
  # invalidityReasons: String
  kusamaStash: String
  location: String
  matrix: [String]
  memory: String
  name: String
  nextKeys: String
  nominatedAt: String
  # nominations: {}
  offlineAccumulated: Int
  offlineSince: Int
  # openGovDelecations: {}
  provider: String
  queuedKeys: String
  rank: Int
  region: String
  rewardDestination: String
  score: CandidateScore
  stash: String!
  total: Float
  unclaimedEras: [String]
  valid: Boolean
  validity: [CandidateValidity]
  # is this used?
  stale: Boolean
  version: String
  vm: Boolean
  # internal fields
  updatedAt: String
  onet: [Onet]
  nominators(limit: Int): [Nominator]
  nominated_1kv: Boolean
}

type CandidateScore {
  address: String # "HyLisujX7Cr6D7xzb6qadFdedLt8hmArB6ZVGJ6xsCUHqmx"
  aggregate: Float # 505.58780307301714
  bonded: Float # 50
  councilStake: Float # 50
  country: Float # 3.414634146341463
  delegations: Float # 0
  democracy: Float # 67.15100461498155
  discovered: Float # 1.775261802442346
  faults: Float # 3.888888888888889
  inclusion: Float # 0
  location: Float # 40
  nominated: Float # 3.6016871207527856
  nominatorStake: Float # 6.9843835426611465
  offline: Float # 2
  openGov: Float # 60.555555555555564
  openGovDelegations: Float # 0
  provider: Float # 100
  randomness: Float # 1.0878045503356144
  rank: Float # 1.9306731156791614
  region: Float # 0
  session: Float # 29133
  spanInclusion: Float # 114.28571428571428
  total: Float # 549.9807127770146
  unclaimed: Float # 0
  updated: BigInt # 1679841084029
  #__v: 0
  #_id: "6420573c51945800774aa1b9"
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

type NewIdentity {
  deposit: BigInt
  info: IdentityInfo
  # judgements: [Judgement]
  judgements: [String]
  sub: String
  parent: String
  children: [String]
}

type Identity {
  chain: String!
  accountId: String
  identity: NewIdentity
  deposit: BigInt
  info: IdentityInfo
  # judgements: [Judgement]
  judgements: [String]
  subId: String
  parentIdentity: Identity
  sub: String #/ new for identityIndex
  parent: String #/ new for identityIndex
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
  commission: Float
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
