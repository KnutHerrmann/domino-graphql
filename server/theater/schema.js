/***

GraphQL type definitions for Domino Theater App

***/

const reservedDominoFields = `
		"""Reserved Read-Only field. 
		Unique record ID - 
		managed by Domino"""						unid: ID!
		"""Reserved Read-Only field. 
		Date/time of record creation - 
		managed by Domino"""						created: String
		"""Reserved Read-Only field. 
		Date/time of record modified - 
		managed by Domino"""						modified: String
`;

const schema = `

	scalar Json
	
	"""
	Performance = show at a specific date/time on a specific stage for a specific price per seat category
	"""
	type Performance {
		${reservedDominoFields}
		"Performance id "							id: ID!
		"Show"										show: Show
		"Stage"										stage: Stage
		"Date of performance"						date: String
		"Time of performance"						time: String
		"Price for category 1 in Cent" 				price1: Int
		"Price for category 2 in Cent" 				price2: Int
		"Price for category 3 in Cent" 				price3: Int	
		"Tickets"									tickets: [Ticket]
	}
		
	"""
	Show = title, subtitle and description of one of theater's shows
	"""
	type Show {
		${reservedDominoFields}
		"Show id"									id: ID!
		"Show's title"								title: String
		"Show's subtitle"							subtitle: String
		"Show's description"						description: String
		"Scheduled performances"					performances: [Performance]
	}
		
	"""
	Stage = name and all technical parameters to describe one of theater's stages
	"""
	type Stage {
		${reservedDominoFields}
		"Stage id"									id: ID!
		"Name of the stage"							name: String
		"""List of seats (JSON object)
		{ seat: [x, y, rotation, category], ...}"""	seats: Json
		"Labels for rows (JSON array)"				rows: Json
		"Label strings (JSON array)"				labels: Json
		"HTML Labels (JSON array)"					htmls: Json
		"Width in px"								width: Int
		"Height in px"								height: Int
		"Zoom start"								zoomstart: Float
		"Zoom minimum"								zoommin: Float
		"Zoom maximum"								zoommax: Float
		"Scheduled performances"					performances: [Performance]
	}

	"""
	Ticket = seat for a performance booked by an order
	"""
	type Ticket {
		${reservedDominoFields}
		"Performance"								performance: Performance
		"Order"										order: Order
		"Seat"										seat: String
	}

	"""
	Order = order is a collection of booked tickets by a customer
	"""
	type Order {
		${reservedDominoFields}
		"Order id"									id: ID!
		"Order date time"							orderdatetime: String
		"Total"										total: String
		"Customer"									customer: Customer
		"Tickets"									tickets: [Ticket]
	}
		
	"""
	Customer = customer with name, addess and e-mail
	"""
	type Customer {
		${reservedDominoFields}
		"Customer's id (= email / login name)"		id: ID!
		"Customer's last name"						lastname: String
		"Customer's first name"						firstname: String
		"Customer's phone number"					phone: String
		"Customer's zip code"						zipcode: String
		"Customer's city"							city: String
	}


	"""
	CustomerInput = data for new customer with id, password, name, addess and e-mail
	"""
	input CustomerInput {
		"Customer's last name"						lastname: String
		"Customer's first name"						firstname: String
		"Customer's phone number"					phone: String
		"Customer's zip code"						zipcode: String
		"Customer's city"							city: String
	}


	"""
	PurchaseInput = properties for buying tickets
	"""
	input PurchaseInput {
		performanceId: String!,
		seats: [String!]!,
		total: Int
	}
		
	"""
	Queries available on the Domino Theater service
	"""
	type Query {
	    performances(count: Int): [Performance]
    	performance(id: String!): Performance
	    shows: [Show]
    	show(id: String!): Show
	    stages: [Stage]
    	stage(id: String!): Stage
    	customer(id: String!, password: String!): Customer
		order(id: String!): Order
	}

	"""
	Mutations available on the Domino Theater service
	"""
	type Mutation {
		buyTickets(id: String!, password: String!, input: PurchaseInput): Order
		createCustomer(id: String!, password: String!, input: CustomerInput): Customer
		updateCustomer(id: String!, password: String!, input: CustomerInput): Customer
		changePassword(id: String!, password: String!, newPassword: String!): Customer
	}
  		
`;

module.exports = schema;
