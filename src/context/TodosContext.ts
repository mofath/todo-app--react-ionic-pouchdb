import { createContext } from "react";

interface Context {
  todos: any[];
  getTodos: () => void;
  addNewTodo: (title: any, status: any) => Promise<any>;
}

const TodosContext = createContext<Context>({
  todos: [],
  getTodos: async () => {},
  addNewTodo: async (title: any, status: any) => {},
});

export default TodosContext;
