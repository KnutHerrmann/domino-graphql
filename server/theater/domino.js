/***
 
Domino helper functions for GraphQL resolvers

***/

const {useServer} = require('@domino/domino-db');
const get = require('lodash.get');
const sortby = require('lodash.sortby');

let numberDqlCalls = 0;

const getNumberDqlCalls = () => {
  const number = numberDqlCalls;
  numberDqlCalls = 0;
  return number;
};

// Setup domino-db server connection

const serverConfig = {
  hostName: 'localhost', // Host name of your server eg your.server.com
  connection: {
    port: '3002', // Proton port on your server eg 3002 (default)
    secure: false, // defaults to false if not specified. if set to true, but specify valid credentails as per below
  },
};

const DB_THEATER = 'theater';
const DB_CUSTOMERS = 'customers';
const databases = {};

useServer(serverConfig)
  .then(async (server) => {
    databases[DB_THEATER] = await server.useDatabase({filePath: 'theater.nsf'});
    databases[DB_CUSTOMERS] = await server.useDatabase({filePath: 'customers.nsf'});
  })
  .catch((error) => {
    console.log(`Error initializing Domino server/database: ${error.code} - ${error.message}`);
  });

/**
 * Returns array of (unique) requested fields from root of request, else returns empty array []
 * @param {*} info
 */
const getRequestedReadFieldsRoot = (info) => {
  const fieldReplacements = {
    show: 'showid',
    stage: 'stageid',
    performance: 'performanceid',
    order: 'orderid',
    customer: 'customerid',
    tickets: 'id',
    performances: 'id',
  };

  const infoQueryFields = get(info, 'fieldNodes[0].selectionSet.selections') || [];

  return infoQueryFields
    .map((field) => fieldReplacements[field.name.value] || field.name.value)
    .filter((value, index, self) => self.indexOf(value) === index);
};

const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;

/******************************************************************************************
 * Build and return a new object containing only those fields originally requested in query
 * @param {*} requestedReadFields
 * @param {*} documentFields
 */
const buildRequestedReturnObject = (requestedReadFields, documentFields) => {
  const result = {};

  requestedReadFields.forEach((requestedField) => {
    const dominoField = (documentFields.hasOwnProperty(requestedField) ? '' : '@') + requestedField;
    let value = documentFields[dominoField];
    if (isObject(value)) {
      value = value.data;
    }
    if (value && value.toString().indexOf('\u0000') >= 0) {
      // remove weird new lines from Domino
      value = value.toString().replace(/\u0000/g, '');
    }
    result[requestedField] = value;
  });

  return result;
};

/*************************************************************************************
 *
 */
const getRequestedDocumentFields = async (info, document) => {
  const requestedReadFields = getRequestedReadFieldsRoot(info);
  const documentFields = await document.read({itemNames: requestedReadFields});
  numberDqlCalls++;
  return buildRequestedReturnObject(requestedReadFields, documentFields);
};

/*************************************************************************************
 *
 */
const getDocumentUnid = async (database, query) => {
  const documents = await databases[database].bulkReadDocuments({
    query,
    count: 1,
  });
  numberDqlCalls++;
  const unid = get(documents, 'documents[0][@unid]');
  if (!unid) {
    throw 'Could not find document: ' + query;
  }
  return unid;
};

/**************************************************************************************
 * Get documents from domino.db
 * properties:
 *    info
 *    query
 *    count = 1 - returns a document / otherwise an array of documents
 *    sortBy - Array of field names
 *    database
 */
const getDocuments = async ({info, query, count = 200, sortBy, database = DB_THEATER}) => {
  // need to specify required fields names here - these same fields must also be in returning type schema!
  const requestedReadFields = getRequestedReadFieldsRoot(info);
  const documents = await databases[database].bulkReadDocuments({
    query,
    itemNames: requestedReadFields,
    count: sortBy ? 1000000 : count, // as DQL doesn't sort we have to get ALL documents and sort it here :-(
  });
  numberDqlCalls++;
  const result = documents.documents.map((documentFields) =>
    buildRequestedReturnObject(requestedReadFields, documentFields)
  );
  if (count == 1) {
    return result[0];
  }
  return (sortBy ? sortby(result, sortBy) : result).splice(0, count);
};

/***************************************************************************************
 * Create a new document in Domino
 */
const createDocument = async ({info, fields, database = DB_THEATER}) => {
  const newDocumentUnid = await databases[database].createDocument({
    document: fields,
    computeOptions: {
      computeWithForm: true,
    },
  });
  numberDqlCalls++;
  const document = await databases[database].useDocument({unid: newDocumentUnid});
  numberDqlCalls++;
  return await getRequestedDocumentFields(info, document);
};

/***************************************************************************************
 * Update document in Domino
 */
const updateDocument = async ({info, query, fields, database = DB_THEATER}) => {
  const unid = await getDocumentUnid(database, query);
  const document = await databases[database].useDocument({unid});
  numberDqlCalls++;
  await document.replaceItems({replaceItems: fields});
  numberDqlCalls++;
  return await getRequestedDocumentFields(info, document);
};

exports.getDocuments = getDocuments;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.getNumberDqlCalls = getNumberDqlCalls;
exports.DB_THEATER = DB_THEATER;
exports.DB_CUSTOMERS = DB_CUSTOMERS;
