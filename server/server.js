import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: 30, isMarried: true },
  { id: "2", name: "Jane Smith", age: 25, isMarried: false },
  { id: "3", name: "Alice Johnson", age: 28, isMarried: false },
];

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
    updateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): User
    deleteUser(id: ID!): String
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: () => users,

    getUserById: (parent, args) => {
      return users.find((user) => user.id === args.id);
    },
  },

  Mutation: {
    // CREATE
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;

      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };

      users.push(newUser);
      return newUser;
    },

    //  UPDATE
    updateUser: (parent, args) => {
      const { id, name, age, isMarried } = args;

      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) return null;

      users[userIndex] = {
        ...users[userIndex],
        name,
        age,
        isMarried,
      };

      return users[userIndex];
    },

    //  DELETE
    deleteUser: (parent, args) => {
      const { id } = args;

      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) return "User not found";

      users.splice(userIndex, 1);
      return "User deleted successfully";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`✅ Server running at: ${url}`);
