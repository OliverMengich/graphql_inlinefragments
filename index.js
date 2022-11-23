import express from "express";
import { graphqlHTTP } from "express-graphql";
import eventSchema from './graphql/schema/schema.graphql.js';
import eventResolver from "./graphql/resolvers/resolver.graphql.js";
import sequelize from "./database/db.js";
import Concert from "./models/concert.model.js";
import Conference from "./models/conference.model.js";
import Festival from "./models/festival.model.js";
import Venue from "./models/venue.model.js";

Concert.belongsTo(Venue, {
    foreignKey:'venueId'
})
Conference.belongsTo(Venue, {
    foreignKey: 'venueId',
});
Festival.belongsTo(Venue, {
    foreignKey: 'venueId'
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get('/', function (req, res, next) {
    res.send("<h1>Hello, world!</h1>")
});
app.use('/graphql', graphqlHTTP({
    schema: eventSchema,
    rootValue: eventResolver,
    graphiql: true,
}))
sequelize.sync()
.then(res=> {
    app.listen(4000, () => {
        console.log("App running");
    })
})
.catch(err => {
    console.log(err);
})