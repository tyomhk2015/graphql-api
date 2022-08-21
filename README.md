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

```
    const resolvers = {
        Query: {
            allCharacters() {
                ...
            }
        }
    }
    ...
    const server = new ApolloServer({typeDefs, resolvers});
```

`Resolvers` is where actually data passed or do operations that user request via GraphQL.

The name of functions in `Query` of `resolvers` have to be same as the ones written inside GraphQL scheme language definition, the part inside of gql``.

```
    const resolvers = {
        Query: {
            character(root, args) {
                // Your actual logic goes here
            }
        },
        Mutation: {
            addCharacter(root, {id, name}) {
                // Your actual logic goes here
            }
        }
    }
```

＊ Don't forget to add the type definitions and resolvers as the parameter of `ApolloServer({})`, otherwise no request will be handled.

To get parameters or arguments from requests, the code must be like the one above, in Node.JS perspective.

Regardless of the language used for the GraphQL, the first argument will always return `root` element, and the second argument, `args`, will return an element containing all arguments that are sent with the request.

`Query` and `Mutation` of `resolvers` are just conceptual division, which means you can acutally update the data by calling functions inside the `Query`. However, this may cause some maintenance problem.

`root` has data that has same structure as the types defined by scheme definition language. If you need to add a new field by leveraging previous queried data, then the `root` object is what you might need.

```
// Assuming the queried data has 'id' and 'name' field.

    // Mutation
    return {
        newCustomField: root.id + root.name
    }
```

To document you GraphQL api, add three double quotations, write some description about API, and close the context with another three double quotations.

```
    """
        This is how you document your GraphQL API
    """
    type Character {
        id: ID!
        name: String
        stories: [Story]
    }
```

