export type Todo = {
  id: number;
  text: string;
  done: boolean;
};
export type TodoState = {
  todos: Todo[];
};
export type Action =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: { id: number; text: string } }
  | { type: "COMPLETE_ALL" }
  | { type: "CLEAR_COMPLETED" };
export const reducer = (state: TodoState, action: Action) => {
  const { todos } = state;
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = action.payload;
      return { todos: [...todos, action.payload] };
    }
    case "TOGGLE_TODO": {
      const id = action.payload;
      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      };
    }
    case "DELETE_TODO": {
      const id = action.payload;
      return { todos: todos.filter((todo) => todo.id !== id) };
    }
    case "EDIT_TODO": {
      const { id, text } = action.payload;
      return {
        todos: todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      };
    }
    case "COMPLETE_ALL": {
      return { todos: todos.map((todo) => ({ ...todo, done: true })) };
    }
    case "CLEAR_COMPLETED": {
      return { todos: todos.filter((todo) => !todo.done) };
    }
    default:
      return state;
  }
};
