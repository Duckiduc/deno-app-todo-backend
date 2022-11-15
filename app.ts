import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

// import { connect } from "./utils/db_utils.ts";

// connect();

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
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(async (ctx, next) => {
  await next();
});

const PORT = parseInt(Deno.env.get("PORT") as string) || 8000;
await app.listen({ port: PORT });