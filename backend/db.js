 import sqlite3 from "sqlite3";
 import { open } from "sqlite";
 const db = await open({
  filename: "database.sqlite",
  driver: sqlite3.Database
 });
 await db.exec(`
  CREATE TABLE IF NOT EXISTS projetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    responsavel TEXT,
    situacao TEXT,
    dataEntrega TEXT
  );
 `);
 console.log("Banco criado com sucesso!");