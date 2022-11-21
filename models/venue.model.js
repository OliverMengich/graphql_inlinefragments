import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
const Venue = sequelize.define('Venues', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: false,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    maxOccupancy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        unique: true,
        type: DataTypes.TIME,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.TIME,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false,
});
export default Venue;