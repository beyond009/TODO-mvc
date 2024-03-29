import React, { useRef, useState, useMemo } from "react";
import { useTodo } from "./context/useTodo";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./context/reducer";
function App() {
  const todoRef = useRef<HTMLInputElement>(null);
  const [{ todos }, dispatch] = useTodo();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const hanldeAddTodo = () => {
    if (todoRef.current?.value) {
      dispatch({
        type: "ADD_TODO",
        payload: {
          text: todoRef.current?.value as string,
          id: Date.now(),
          done: false,
        },
      });
      todoRef.current.value = "";
    }
  };

  const handleClearCompleted = () => {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  };

  const filteredTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.done);
      case "completed":
        return todos.filter((todo) => todo.done);
    }
  }, [filter, todos]);

  const [isCompletedAll, itemsLeft]: [boolean, number] = useMemo(() => {
    let itemsLeft = 0;
    todos.forEach((todo) => {
      itemsLeft += todo.done ? 0 : 1;
    });
    return [itemsLeft ? false : true, itemsLeft];
  }, [todos]);
  const handleToggleAll = () => {
    dispatch({
      type: "TOGGLE_ALL",
    });
  };
  return (
    <div className="flex flex-col items-center pt-12 min-h-screen bg-gray-50">
      <div className="text-5xl text-stone-950 font-mono">TODO</div>
      <input
        ref={todoRef}
        type="text"
        placeholder="What needs to be done?"
        className="input input-bordered w-full max-w-[520px] mt-12"
        onKeyDown={(e) => {
          e.key === "Enter" && hanldeAddTodo();
        }}
      />
      <ul className="overflow-x-auto w-full max-w-[520px] mt-12 rounded-md bg-white">
        <li className="flex h-12 items-center px-6 border-b-2 border-gray-100">
          <input
            type="checkbox"
            className="checkbox"
            checked={isCompletedAll && todos.length > 0}
            onChange={() => {
              handleToggleAll();
            }}
          />
        </li>
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
        <li className="relative flex items-center justify-center h-12">
          <div className="absolute text-sm left-4">{itemsLeft} items left</div>
          <div className="tabs">
            <a
              className={`tab ${filter === "all" ? "tab-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </a>
            <a
              className={`tab ${filter === "active" ? "tab-active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </a>
            <a
              className={`tab ${filter === "completed" ? "tab-active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </a>
          </div>
          {filter === "completed" && filteredTodos.length ? (
            <button
              className="absolute right-2 text-sm"
              onClick={() => {
                handleClearCompleted();
              }}
            >
              clear completed
            </button>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

export default App;
