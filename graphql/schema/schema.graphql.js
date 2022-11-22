import { buildSchema } from 'graphql';
const schema = buildSchema(`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        # Retrieve Events at a specific Venue
        #findEventsAtVenue(venueId: ID!): Concert
        search(query: String): [SearchResult]
        venues: [Venue!]!
        concerts: [Concert!]!
        festivals: [Festival]!
    }
    type Mutation{
        createVenue(venueInput: VenueInput): Venue!
        createConcerts(concertInput: ConcertInput): Concert!
        createFestival(festivalInput: FestivalInput): Festival
        createConference(conferenceInput: ConferenceInput): Conference
    }
    input FestivalInput{
        name: String!
        startsAt: String!
        endsAt: String!
        venueId: ID!
        minAgeRestriction: Int
        performers: [String]
    }
    input VenueInput{
        name: String
        address: String
        maxOccupancy: Int
    }
    input ConcertInput{
        name: String!
        startsAt: String!
        endsAt: String!
        venueId: ID!
        minAgeRestriction: Int!
        performingBand: String!
    }
    union SearchResult = Conference | Festival | Concert
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
        venue: Venue!
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
        startsAt: String!
        endsAt: String!
        venue: Venue!
        minAgeRestriction: Int!
        performers: [String!]!
    }

    type Conference implements Event {
        id: ID!
        name: String!
        startsAt: String
        endsAt: String
        venue: Venue!
        minAgeRestriction: Int
        speakers: [String]
        workshops: [String]
    }
    input ConferenceInput{
        name: String!
        startsAt: String
        endsAt: String!
        venueId: ID!
        minAgeRestriction: Int!
        speakers: [String!]!
        workshops: [String!]!
    }
    query {
        search(query: "Madison") {

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