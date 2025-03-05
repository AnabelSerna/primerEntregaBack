import 'dotenv/config';
import express from 'express';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import passport from 'passport';
import apiUserRoute from './routes/api.users.js';
import userRoute from './routes/users.js';
import sessionRoute from './routes/sessions.js';
import __dirname from "./dirname.js";
import './config/passport.js';

const app = express();
const PORT = process.env.PORT || 5001;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDB = process.env.MONGO_DB;
const mongoURL = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/${mongoDB}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));

mongoose
  .connect(mongoURL)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use("/users", userRoute);
app.use("/api/users", apiUserRoute);
app.use("/api/sessions", sessionRoute);

app.get('/', (req, res) => {
  res.render('login');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});