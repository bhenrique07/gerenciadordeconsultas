 import express from "express";
 import cors from "cors";
 import sqlite3 from "sqlite3";
 import { open } from "sqlite";
 import routes from "./routes.js";
 const app = express();
 app.use(cors());
 app.use(express.json());
 const db = await open({
  filename: "database.sqlite",
  driver: sqlite3.Database
 });
 routes(app, db);
 app.listen(3001, () => {
  console.log("Backend rodando na porta 3001");
 });