import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import Todo from "../models/todo.ts";

type Body = {
  text: string;
};

export const getAllTodos = async (ctx: RouterContext<"/todos">) => {
  const todos = await Todo.all();
  const myTodos = todos.map((todo) => {
    return {
      id: todo.id,
      text: todo.text,
    };
  });

  ctx.response.body = {
    message: "All ToDos",
    todos: myTodos,
  };
};
