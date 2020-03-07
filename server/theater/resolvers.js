/***

GraphQL resolvers for Domino Theater App

***/

const {getDocuments, createDocument, updateDocument, DB_CUSTOMERS} = require('./domino');
const {typeJson} = require('./typeJson');

const getDocument = (props) => getDocuments({...props, count: 1});

// Define resolvers

const resolvers = {
  Json: typeJson,

  Performance: {
    show: (parent, args, context, info) =>
      getDocument({info, query: `'shows'.id = '${parent.showid}'`}),
    stage: (parent, args, context, info) =>
      getDocument({info, query: `'stages'.id = '${parent.stageid}'`}),
    tickets: (parent, args, context, info) =>
      getDocuments({info, query: `'tickets'.performanceid = '${parent.id}'`}),
  },

  Show: {
    performances: (parent, args, context, info) =>
      getDocuments({
        info,
        query: `'performances'.showid = '${parent.id}'`,
        sortBy: ['date', 'time'],
      }),
  },

  Stage: {
    performances: (parent, args, context, info) =>
      getDocuments({
        info,
        query: `'performances'.stageid = '${parent.id}'`,
        sortBy: ['date', 'time'],
      }),
  },

  Ticket: {
    order: (parent, args, context, info) =>
      getDocument({info, query: `'orders'.id = '${parent.orderid}'`}),
    performance: (parent, args, context, info) =>
      getDocument({info, query: `'performances'.id = '${parent.performanceid}'`}),
  },

  Order: {
    customer: (parent, args, context, info) =>
      getDocument({
        info,
        database: DB_CUSTOMERS,
        query: `'customers'.id = '${parent.customerid}'`,
      }),
    tickets: (parent, args, context, info) =>
      getDocuments({info, query: `'tickets'.orderid = '${parent.id}'`}),
  },

  Query: {
    performances: (parent, args, context, info) =>
      getDocuments({
        info,
        query: "form = 'performance'",
        sortBy: ['date', 'time'],
        count: args.count,
      }),

    shows: (parent, args, context, info) => getDocuments({info, query: "form = 'show'"}),

    stages: (parent, args, context, info) => getDocuments({info, query: "form = 'stage'"}),

    performance: (parent, args, context, info) =>
      getDocument({info, query: `'performances'.id = '${args.id}'`}),

    show: (parent, args, context, info) => getDocument({info, query: `'shows'.id = '${args.id}'`}),

    stage: (parent, args, context, info) =>
      getDocument({info, query: `'stages'.id = '${args.id}'`}),

    customer: (parent, args, context, info) =>
      getDocument({
        info,
        query: `'customers'.id = '${args.id}' and password = '${args.password}'`,
        database: DB_CUSTOMERS,
      }),

    order: (parent, args, context, info) =>
      getDocument({info, query: `'orders'.id = '${args.id}'`}),
  },

  Mutation: {
    buyTickets: async (parent, args, context, info) => {
      const {id: customerid, input} = args;
      const {total, performanceId, seats} = input;
      const fields = {customerid, total, form: 'order'};
      const order = await createDocument({info, fields});
      const {id: orderid} = order;
      seats.forEach(
        async (seat) =>
          await createDocument({info, fields: {orderid, performanceId, seat, form: 'ticket'}})
      );
      return order;
    },

    createCustomer: (parent, args, context, info) => {
      const {id, password, input} = args;
      const fields = {id, password, ...input, form: 'customer'};
      return createDocument({info, fields, database: DB_CUSTOMERS});
    },

    updateCustomer: (parent, args, context, info) =>
      updateDocument({
        info,
        fields: args.input,
        query: `'customers'.id = '${args.id}' and password = '${args.password}'`,
        database: DB_CUSTOMERS,
      }),

    changePassword: (parent, args, context, info) =>
      updateDocument({
        info,
        fields: {password: args.newPassword},
        query: `'customers'.id = '${args.id}' and password = '${args.password}'`,
        database: DB_CUSTOMERS,
      }),
  },
};

module.exports = resolvers;
