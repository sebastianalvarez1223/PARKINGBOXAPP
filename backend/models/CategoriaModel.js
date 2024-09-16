import { Sequelize } from 'sequelize';
import db from '../config/Database.js';


const { DataTypes } = Sequelize;

const Categoria = db.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreCategoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tarifa: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    
}, {
    freezeTableName: true
});

export default Categoria;
