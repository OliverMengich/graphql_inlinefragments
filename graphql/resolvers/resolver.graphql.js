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
    search: ({query}) => {
        
    }
}
export default resolver