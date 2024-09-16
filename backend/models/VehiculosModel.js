import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import User from './UserModel.js';
import Categoria from './CategoriaModel.js';
import AreaParqueo from './AreaParqueoModel.js';

const { DataTypes } = Sequelize;

const Vehiculo = db.define('vehiculo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
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
    areaBahia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AreaParqueo,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombreDueño: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uuid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // false (0) para 'entrada', true (1) para 'salida'
    },
    TiempoIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true
});

export default Vehiculo;
