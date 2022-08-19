const { ApolloServer, gql } = require('apollo-server');

const characters = [{
  id: "1",
  name: "TEMP",
  stories: ['episode1']
}];

// The space between backticks is where Scheme Definition Language defined,
// telling GraphQL the shapes of data to be used in near future.
const typeDefs = gql`
  type Character {
    id: ID!
    name: String
    stories: [Story]
  }

  type Story {
    id: ID!
    character: String
    story: String
  }

  type Query {
    allCharacters: [Character]
    character(id: ID!): Character
  }

  type Mutation {
    addCharacter(id: ID!, name: String!): Character
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
      console.log(args);
      return args.toString();
    }
  },
  Mutation: {
    addCharacter(root, {id, name}) {
      console.log(id, name);
      return null;
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running On ${url}`);
})