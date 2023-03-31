import React, { useRef } from "react";
import { useTodo } from "./context/useTodo";

function App() {
  const todoRef = useRef<HTMLInputElement>(null);
  const [{ todos }, dispatch] = useTodo();
  const hanldeAddTodo = () => {
    console.log(todoRef.current?.value);
  };
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="text-5xl text-stone-950 font-mono">TODO</div>
      <input
        ref={todoRef}
        type="text"
        placeholder="What needs to be done?"
        className="input input-bordered w-full max-w-[420px] mt-12"
        onKeyDown={(e) => {
          e.key === "Enter" && hanldeAddTodo();
        }}
      />
    </div>
  );
}

export default App;
