import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite',
    logging: false,
});
sequelize.authenticate().then(()=>console.log("Connected to database"));
export default sequelize;