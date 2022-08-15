## Chunithm Music & GraphQL API

### API

・An entity that does the work for you.<br />
・A menu with features listed on.<br />
・Public features that the client/developer can use without knowing the detail or the workflow of the feature.

### <a href="https://graphql.org/">GraphQL</a>

Solved two problems that REST API were facing, over-fetching and under-fetching.

```
  1. Over-fetching: Receiving more data than actually needed.
  2. Under-fetching: Receiving less data than actually needed.
```

GraphQL is a specification made by Facebook(or Meta), which allows to get only needed data with a single query.

### <a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a>

A server that understands GraphQL, because it implements GraphQL specification.<br />
Apollo server can be operated seperately or with existing servers by adding middlewares with graphQL specification.<br />


### Error during implementation

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

### GraphQL API

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