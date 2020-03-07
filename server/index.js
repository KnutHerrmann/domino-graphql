/***

GraphQL Server with Domino backend based on domino.db

created by 
- Paul Harrison (Eight Dot Three Limited)
- Knut Herrmann (Leonso GmbH)

***/

// Load required modules...

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');

// Load external GraphQL configuration/code files...

const typeDefs = require('./theater/schema'); // Type Definitions
const resolvers = require('./theater/resolvers'); // Resolvers
const {getNumberDqlCalls} = require('./theater/domino');

const port = process.env.PORT || 4002;

const app = express();

let startTime;

const loggingMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    startTime = new Date();
    numberDqlCalls = 0;
    res.on('finish', () => {
      const time = new Date() - startTime;
      console.log(`execution time: ${time} ms ... DQL calls: ${getNumberDqlCalls()}`);
    });
  }
  next();
};
app.use(loggingMiddleware);

// Add CORS support (or alternatively simply use the CORS module!)...

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Build GraphQL configuration into single 'merged' object...

const mergedSchemaDomino = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Finally, start Express server...

app.use(
  '/graphql',
  graphqlHTTP({
    // Note use of 'use' rather than 'post'. Endpoint name can also be changed from convention if required
    schema: mergedSchemaDomino, // Use 'merged' configuration object
    graphiql: true, // Optionally enable use if GraphiQL feature
    customFormatErrorFn(err) {
      // Optionally provide custom error return handler
      //return err;						// Return normal defaul error formatting style
      if (!err.originalError) {
        return err; // Return default error handler if no custom error returned by Resolver
      }
      const data = err.originalError.data;
      const message = err.message || 'An unspecified error occurred';
      const code = err.originalError.code || 500;
      return {message: message, status: code, data: data};
    },
  })
);

app.listen(port);

console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
