const { ApolloServer, gql } = require('apollo-server');

const characters = [{
  id: "1",
  name: "TEMP",
  stories: []
}];

// The space between backticks is where Scheme Definition Language defined,
// telling GraphQL the shapes of data to be used in near future.
const typeDefs = gql`
  """
    This is how you document your GraphQL API
  """
  type Character {
    id: ID!
    name: String
    stories: [String]
  }

  type Query {
    allCharacters: [Character]
    character(id: ID!): Character
  }

  type Mutation {
    addCharacter(id: ID!, name: String!, stories: [String]): Character
    updateCharacter(id: ID!, name: String!): Character
    deleteCharacter(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allCharacters() {
      return characters;
    },
    character(root, args) {
      console.log('hello \n\n\n byeye');
      return args.toString();
    }
  },
  Mutation: {
    addCharacter(root, {id, name, stories}) {
      return {
        id: id,
        name: name,
        stories: [String]
      };
    }
  },
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running On ${url}`);
})