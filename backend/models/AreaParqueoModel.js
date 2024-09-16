import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Categoria from './CategoriaModel.js';

const { DataTypes } = Sequelize;

const AreaParqueo = db.define('areaParqueo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoriaNamebh: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidadArea: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default AreaParqueo;
