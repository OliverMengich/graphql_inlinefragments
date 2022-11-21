import { buildSchema } from 'graphql';
const schema = buildSchema(`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        # Retrieve Events at a specific Venue
        #findEventsAtVenue(venueId: ID!): Concert
        #search(query: String): [SearchResult]
        events: String!
        venues: [Venue]!
        concerts: [Concert!]
    }
    type Mutation{
        createVenue(venueInput: VenueInput): Venue
    }
    input VenueInput{
        name: String
        address: String
        maxOccupancy: Int
    }
    union SearchResult = Conference | Festival | Concert | Venue
    type Venue {
        id: ID!
        name: String
        address: String
        maxOccupancy: Int
    }

    type Concert implements Event {
        id: ID!
        name: String!
        startsAt: String
        endsAt: String
        venue: Venue
        minAgeRestriction: Int
        performingBand: String
    }

    interface Event {
        id: ID!
        name: String!
        startsAt: String
        endsAt: String
        venue: Venue
        minAgeRestriction: Int
    }

    type Festival implements Event {
        id: ID!
        name: String!
        startsAt: String
        endsAt: String
        venue: Venue
        minAgeRestriction: Int
        performers: [String]
    }

    type Conference implements Event {
        id: ID!
        name: String!
        startsAt: String
        endsAt: String
        venue: Venue
        minAgeRestriction: Int
        speakers: [String]
        workshops: [String]
    }
    query {
        search(query: "Madison") {
            ... on Venue {
                id
                name
                address
            }

            ... on Festival {
                id
                name
                performers
            }

            ... on Concert {
                id
                name
                performingBand
            }

            ... on Conference {
                speakers
                workshops
            }
        }
    }
`);
export default schema