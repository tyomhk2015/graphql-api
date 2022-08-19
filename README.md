## Chunithm Characters & GraphQL API

### API 💡

・An entity that does the work for you.<br />
・A menu with features listed on.<br />
・Public features that the client/developer can use without knowing the detail or the workflow of the feature.

### <a href="https://graphql.org/">GraphQL</a> 💡

Solved two problems that REST API were facing, over-fetching and under-fetching.

```
  1. Over-fetching: Receiving more data than actually needed.
  2. Under-fetching: Receiving less data than actually needed.
```

GraphQL is a specification made by Facebook(or Meta), which allows to get only needed data with a single query.

### <a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a> 💡

A server that understands GraphQL, because it implements GraphQL specification.<br />
Apollo server can be operated seperately or with existing servers by adding middlewares with graphQL specification.<br />


### Errors during implementation 💡

```
    throw Error('Apollo Server requires either an existing schema, modules or typeDefs');
```
GraphQL needs to know the shape of the data in advance, but the shape is not given to GraphQL yet.

```
// server.js
    const typeDefs = gql``;
    const server = new ApolloServer({typeDefs});
    ---
// terminal
    throw this.unexpected(keywordToken);
    ^

    GraphQLError: Syntax Error: Unexpected <EOF>.
```
No type definitions are given to `gql`.

```
    Error: Query root type must be provided.
```
'Query' type must be provided inside `gql` backticks.

### GraphQL API 💡

A collection of a lot of types used to send to or receive from the server.

```
    const typeDefs = gql`
        type Query {
            music: String
            level: String
        }
    `;
```
The GraphQL type definition written above is like exposing `GET` request URLs with `/music` or `/level`.

```
    REST API: 
        host/music
        host/level
```

📝 For syntax highlighting in VSCode, install `Apollo GraphQL` created by `Apollo GraphQL`.

To add GET request, `Query` type, to add POST request, `Mutation` type is must.

The `Mutation` takes care of `DELETE` or `PUT` requests, which is much simpler than REST.

```
    type Query {
        allCharacters: [Character!]
        character(id: ID!): Character!
    }

    // What is the exclamation mark on the right side of each type?
```

`!` means that the type or the variable `CANNOT` be nullable.<br />
When you are certain that the variable is not null, then adding `!` may be good practice, IMO.<br />
If no data has been given to `!` arguments, this will invoke errors.

Default settings for variables or types in GraphQL is nullable.<br />

In the case of lists, `[]`,`!` will not cause errors if there is no data in the database. Instead, the data will be empty, just like an empty array.

```
    const typeDefs = gql`
        ...  <<<< Schema Definition Language section.
    `;
```

Schema Definition Language can be used with any programming languages that handles data. (e.g Go, Python, Java and more)

