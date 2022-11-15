import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
  createNewTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.ts";

const router = new Router();

router.get("/todos", getAllTodos);

router.post("/todo", createNewTodo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

export default router;
