import { Database, MySQLConnector } from "https://deno.land/x/denodb@v1.1.0/mod.ts";

import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { SQL_SCHEMA, SQL_HOST, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = config();

let db: Database;
export const connect = () => {
  try {
    const connector = new MySQLConnector({
      database: Deno.env.get(SQL_SCHEMA) as string,
      host: Deno.env.get(SQL_HOST) as string,
      username: Deno.env.get(SQL_USERNAME) as string,
      password: Deno.env.get(SQL_PASSWORD) as string,
      port: parseInt(Deno.env.get(SQL_PORT) as string),
    });
    db = new Database(connector);
  } catch (err) {
    console.log(err);
  }
};

export const getDB = () => {
  if (!db) {
    connect();
  }
  return db;
};