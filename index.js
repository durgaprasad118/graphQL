const port = 8081;
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
const books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
  type Mutation {
    addBook(title: String!, author: String!): Book
  }

`);

const resolvers = {
  books: () => books,
  book: ({ id }) => books.find((book) => book.id === parseInt(id)),
  addBook: ({ title, author }) => {
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    return newBook;
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);
//if we were to use REST => we gotta have 3 endpoints
//for books app.get("/books")
//for book app.get("/books/:id")
//for adding Book app.post("/addbook")
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
