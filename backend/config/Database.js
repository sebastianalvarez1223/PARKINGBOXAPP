import {Sequelize} from "sequelize";
//constante para Sequilize
const db = new Sequelize('parkingboxdb', 'root', '',{
     host: "localhost",
     dialect: "mysql"
});       

export default db;
