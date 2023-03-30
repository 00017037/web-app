import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./routes/users.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config({path:'./config.env'})

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const DB = process.env.DB;

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('DB connection successfull');
})

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.use("/users", userRoutes);

app.use("/", (req, res) => {
  res.redirect('/users');
});

app.listen(process.env.PORT, () => {
  console.log(`server listenning on port ${process.env.PORT}`);
});
