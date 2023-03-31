type Todo = {
  id: number;
  text: string;
  done: boolean;
};
export type TodoState = {
  todos: Todo[];
};
export type Action = {
  type: string;
  payload?: Todo;
};
export const reducer = (state: TodoState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
