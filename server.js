const { ApolloServer, gql } = require('apollo-server');

// The space between backticks is where Scheme Definition Language defined,
// telling GraphQL the shapes of data to be used in near future.
const typeDefs = gql`
  type Character {
    id: ID!
    name: String
    story: [String]
  }

  type Query {
    allCharacters: [Character]
    character(id: ID!): Character
  }

  type Mutation {
    addCharacter(id: ID!, name: String!, story: [String]): Character
    updateCharacter(id: ID!, name: String!, story: [String]): Character
    deleteCharacter(id: ID!): Boolean!
  }
`;



const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`Running On ${url}`);
})