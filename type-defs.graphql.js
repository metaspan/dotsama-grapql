import { gql } from 'apollo-server'

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

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  # books: [Book]
  Validator(chain: String!, stash: String): Validator
  Validators(chain: String!, stashes: [String], offset: Int, limit: Int, search: String): [Validator]
  Nominator(chain: String!, accountId: String): Nominator
  Nominators(chain: String!, ids: [String], offset: Int, limit: Int, search: String): [Nominator]
  Pool(chain: String!, id: Int): Pool
  PoolMembers(chain: String!, id: Int): [Nominator]
  Pools(chain: String!, ids: [Int], offset: Int, limit: Int, search: String): [Pool]
  Candidate(chain: String!, stash: String): Candidate
  Candidates(chain: String!, offset: Int, limit: Int, search: String): [Candidate]
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
  deposit: Int
  info: IdentityInfo
  judgements: [Judgement]
  sub_id: String
  parent_identity: Identity
}

type Account {
  accountId: String!
  identity: Identity
}

type Validator {
  chain: String!
  stash: String!
  shortStash: String
  name: String
  identity: Identity
  nominators: [String] # NOT [Nominators] !!!
  updatedAt: String
}

type Nominator {
  chain: String!
  accountId: String!
  controllerId: String
  identity: Identity
  targets: [String]
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
  # validity: [Validity]
  # score: ''
  total: Float
  location: String
  councilStake: Float
  councilVotes: [String]
  democractVoteCount: Int
  democracyVotes: [Int]
  stale: Boolean
  updatedAt: String
}

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
