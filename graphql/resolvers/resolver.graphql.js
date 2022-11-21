import Venue from "../../models/venue.model.js";
import Concert from "../../models/concert.model.js";
import Festival from "../../models/festival.model.js";
import Conference from "../../models/conference.model.js";
const resolver = {
    findEventsAtVenue: ({ venueId }) => {
        console.log(venueId);
        return {
            id: 'fsfdsd',
            name: 'Coding',
            startsAt: new Date(),
            endsAt: new Date(),
            minAgeRestriction: 55
        }
    },
    events: () => {
        return 'hello world'
    },
    createVenue: (args) => {
        console.log(args.venueInput);
        return Venue.create({
            ...args.venueInput,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).then(res => {
            return res.toJSON()
        }).then(venue => {
            
            return {
                ...venue
            }
        }).catch(err => {
            console.log(err);
        })
    },
    venues: () => {
        console.log("Fetching Venues");
        return Venue.findAll()
            .then(res => {
                console.log(res);
                return {
                    ...res
                }
            })
    },
    concerts: () => {
        console.log("Fetching Concerts");
        return Concert.findAll()
            .then(res => {
                console.log(res);
                return {
                    ...res
                }
            }).catch(err => {
                console.log(err);
            })
    },
    search: ({query}) => {
        
    }
}
export default resolver;