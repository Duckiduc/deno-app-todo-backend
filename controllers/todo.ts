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

export const updateTodo = async (ctx: RouterContext<"/todo/:todoId">) => {
  const todoId = ctx.params.todoId as string;
  const body: Body = await ctx.request.body().value;

  await Todo.where("id", todoId).update("text", body.text);

  const updatedTodo = { text: body.text, id: todoId };
  ctx.response.body = {
    message: "ToDo updated",
    todo: updatedTodo,
  };
};

export const deleteTodo = async (ctx: RouterContext<"/todo/:todoId">) => {
  const todoId = ctx.params.todoId;
  await Todo.where("id", todoId as string).delete();
  ctx.response.body = {
    message: "ToDo deleted",
  };
};
