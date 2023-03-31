import React, { useRef } from "react";
import { useTodo } from "./context/useTodo";
import { TodoItem } from "./components/TodoItems";
function App() {
  const todoRef = useRef<HTMLInputElement>(null);
  const [{ todos }, dispatch] = useTodo();
  const hanldeAddTodo = () => {
    console.log(todoRef.current?.value);
  };
  return (
    <div className="flex flex-col items-center pt-12 min-h-screen bg-gray-50">
      <div className="text-5xl text-stone-950 font-mono">TODO</div>
      <input
        ref={todoRef}
        type="text"
        placeholder="What needs to be done?"
        className="input input-bordered w-full max-w-[420px] mt-12"
        onKeyDown={(e) => {
          e.key === "Enter" && hanldeAddTodo();
        }}
      />{" "}
      <ul className="overflow-x-auto w-full max-w-[420px] mt-12 rounded-md bg-white">
        <li className="flex h-12 items-center px-6 border-b-2 border-gray-100">
          <input type="checkbox" className="checkbox" />
        </li>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default App;
