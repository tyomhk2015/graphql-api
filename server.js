import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

let musics;
fetch('https://chunithm.sega.jp/storage/json/music.json').then((response) => response.json()).then(data => {musics = data});

const characters = [{
  id: "1",
  name: "TEMP",
  stories: []
},
{
  id: "2",
  name: "TTEST",
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

  type Music {
    id: String
    catname: String
    title: String
    reading: String
    artist: String
    image: String
  }

  type Query {
    allCharacters: [Character]
    character(id: ID!): Character
    allMusics: [Music]
    music(id: ID!): Music
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
      return args.toString();
    },
    allMusics() {
      return musics;
    },
    music(root, {id}) {
      return musics.find(music => music.id === id);
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