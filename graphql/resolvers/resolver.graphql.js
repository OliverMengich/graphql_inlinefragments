import Venue from "../../models/venue.model.js";
import Concert from "../../models/concert.model.js";
import Festival from "../../models/festival.model.js";
import Conference from "../../models/conference.model.js";
const helperFind =async (Model, query) => {
    const concerts = await Model.findAll({
        where: {
            venueId: query
        }
    });
    return concerts.map(concert => {
        return {
            Concert: {
                ...concert.toJSON(),
                venue: (() => {
                    return Venue.findByPk(concert.venueId)
                        .then(venue => { return venue.toJSON() })
                        .then(res => {
                            return {
                                ...res
                            }
                        })
                })
            },
        }
    })
}
// const helperFind =async (Model, query) => {
//     const concerts = await Model.findAll({
//         where: {
//             venueId: query
//         }
//     });
//     return concerts.map(concert => {
//         return {
//             ...concert.toJSON(),
//             venue: (() => {
//                 return Venue.findByPk(concert.venueId)
//                     .then(venue => { return venue.toJSON() })
//                     .then(res => {
//                         return {
//                             ...res
//                         }
//                     })
//             })
//         }
//     })
// }

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
    
    createVenue: (args) => {
        console.log(args.venueInput);
        return Venue.create({
            ...args.venueInput,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }).then(res => {
            return res.toJSON()
        }).then(venue => {
            return {
                ...venue
            }
        }).catch(err => {
            throw err;
        })
    },
    venues: () => {
        console.log("Fetching Venues");
        return Venue.findAll()
            .then(venues => {
                return venues.map(venue => {
                    console.log(venue.toJSON());
                    return {
                        ...venue.toJSON(),
                        createdAt: new Date(venue.createdAt).toISOString(),
                        updatedAt: new Date(venue.updatedAt).toISOString()
                    }
                })
            }).catch(err => {
                throw err;
            })
    },
    createConcerts: ({ concertInput }) => {
        return Concert.create({
            ...concertInput,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }).then(res => {
            return res.toJSON()
        }).then(concert => {
            return {
                ...concert,
            }
        }).catch(err => {
            throw err;
        })
    },
    concerts: () => {
        return Concert.findAll()
            .then(concerts => {
                return concerts.map(concert => {
                    // console.log({...concert.toJSON()});
                    return {
                        ...concert.toJSON(),
                        venue: (() => {
                            return Venue.findByPk(concert.venueId)
                                .then(venue => { return venue.toJSON() })
                                .then(res => {
                                    return {
                                        ...res
                                    }
                                })
                        })
                    }
                })
            }).catch(err => {
                throw err;
            })
    },
    createFestival: ({ festivalInput }) => {
        const performers = festivalInput.performers.reduce((acc, item) => {
            return `${acc},${item}`.toString()
        });
        return Festival.create({
            ...festivalInput,
            performers,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }).then(res => {
            return res.toJSON();
        }).then(festival => {
            console.log(festival);
            return {
                ...festival,
                performers: festival.performers.split(','),
                venue: (() => {
                    return Venue.findByPk(festival.venueId)
                        .then(venue => { return venue.toJSON() })
                        .then(res => {
                            return {
                                ...res
                            }
                        })
                })
            }
        }).catch(err => {
            throw err;
        })
    },
    festivals: () => {
        return Festival.findAll()
            .then(festivals => {
                return festivals.map(festival => {
                    return {
                        ...festival.toJSON(),
                        performers: performers.split(','),
                        venue: (() => {
                            return Venue.findByPk(festival.venueId)
                                .then(venue => { return venue.toJSON() })
                                .then(res => {
                                    return {
                                        ...res
                                    }
                                })
                        })
                    }
                })
            }).catch(err => {
                throw err;

            })
    },
    createConference: ({ conferenceInput }) => {
        const speakers = conferenceInput.speakers.reduce((acc, item) => {
            return `${acc},${item}`.toString()
        });
        const workshops = conferenceInput.workshops.reduce((acc, item) => {
            return `${acc},${item}`.toString()
        });
        return Conference.create({
            ...conferenceInput,
            speakers,
            workshops,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }).then(res => {
            return res.toJSON();
        }).then(conference => {
            return {
                ...conference,
                venue: (() => {
                    return Venue.findByPk(conference.venueId)
                        .then(venue => { return venue.toJSON() })
                        .then(res => {
                            return {
                                ...res
                            }
                        })
                }),
                speakers: conference.speakers.split(','),
                workshops: conference.workshops.split(','),
            }
        }).catch(err => {
            throw err;
        });
    },
    conferences: () => {
        return Conference.findAll()
            .then(conferences => {
                return conferences.map(conference => {
                    return {
                        ...conference.toJSON(),
                        speakers: conference.speakers.split(','),
                        workshops: conference.workshops.split(','),
                        venue: (() => {
                            return Venue.findByPk(festival.venueId)
                                .then(venue => { return venue.toJSON() })
                                .then(res => {
                                    return {
                                        ...res
                                    }
                                })
                        }),

                    }
                })
            }).catch(err => {
                throw err;
            })
    },
    search: async ({ query }) => {
        const concerts = await helperFind(Concert, query)
            .then(resp => {
                return resp;
                // return resp.map(Concert => {
                //     return {
                //         ...{Concert: Concert},
                //     }
                // })
            }).catch(err => {
                throw err;
            })
        // const festivals = await helperFind(Festival, query)
        //     .then(resp => {
        //         return resp.map(Festival => {
        //             Festival.performers = Festival.performers.split(',');
        //             return {
        //                ...{Festival: Festival},
        //             }
        //         })
        //     }).catch(err => {
        //         throw err;
        //     })
        // const conferences = await helperFind(Conference, query)
        //     .then(resp => {
        //         return resp.map(Conference => {
        //             Conference.speakers = Conference.speakers.split(',')
        //             Conference.workshops = Conference.workshops.split(',')
        //             return {
        //                 ...{Conference: Conference},
                        
        //             }
        //         })
        //     }
        //     ).catch(err => {
        //         throw err;
        //     })
        return {...concerts};
    }
}
export default resolver;