import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import todosRoutes from "./routes/todo.ts";

import { connect } from "./utils/db_utils.ts";

import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { PORT } = config();

connect();

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.response.body = {
      message: "Request could not be processed!",
    };
    ctx.response.status = 500;
  }
});

app.use(async (ctx, next) => {
  const responseHeaders = ctx.response.headers;
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE",
  );
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(async (_ctx, next) => {
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

const DENO_PORT = parseInt(PORT as string) || 8000;
await app.listen({ port: 8000 });
