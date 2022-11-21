import express from "express";
import { graphqlHTTP } from "express-graphql";
import eventSchema from './graphql/schema/schema.graphql.js';
import eventResolver from "./graphql/resolvers/resolver.graphql.js";
import sequelize from "./database/db.js";
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
.then(res => {
    console.log(res);
    app.listen(4000, () => {
        console.log("App running");
    })
})
.catch(err => {
    console.log(err);
})