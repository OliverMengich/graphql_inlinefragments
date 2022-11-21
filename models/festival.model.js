import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
const Festival = sequelize.define('Festivals', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    startsAt: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: true
    },
    endsAt: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    venueId: {
        unique: true,
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    minAgeRestriction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    performers: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.TIME,
        unique: true,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.TIME,
        unique: true,
        allowNull: false
    }
},{timestamps: false}
);
export default Festival;