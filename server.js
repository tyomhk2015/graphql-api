const { ApolloServer, gql } = require('apollo-server');

// The space between backticks is where Scheme Definition Language defined,
// telling GraphQL the shapes of data to be used in near future.
const typeDefs = gql`
  type Query {
    music: String
    level: String
  }
`;

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`Running On ${url}`);
})