import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import relationships from './models/relationships.js';
import CategoriaRoute from './routes/CategoriaRoute.js';
import AreaParqueoRoute from './routes/AreaParqueoRoute.js';
import VehiculosRoute from "./routes/VehiculosRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

relationships();

       /* (async () => {
            await db.sync();
        })(); */

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(CategoriaRoute);
app.use(AreaParqueoRoute);
app.use(VehiculosRoute);
app.use(AuthRoute);

/*store.sync();*/

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
