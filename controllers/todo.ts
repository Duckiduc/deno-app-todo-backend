import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import Todo from "../models/todo.ts";

type Body = {
  text: string;
};

export const createNewTodo = async (ctx: RouterContext<"/todo">) => {
  const body: Body = await ctx.request.body().value;
  const result = await Todo.create({
    text: body.text,
  });
  const todo = { text: body.text, id: result.lastInsertId as string };
  ctx.response.body = {
    message: "ToDo created",
    todo: todo,
  };
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


