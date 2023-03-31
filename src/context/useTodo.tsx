import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import { reducer, type TodoState, type Action } from "./reducer";

const initialState: TodoState = { todos: [] };

const todoContext = createContext<[TodoState, React.Dispatch<Action>]>([
  { todos: [] },
  () => {},
]);

export const TodoProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  return (
    <todoContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </todoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(todoContext);
};
