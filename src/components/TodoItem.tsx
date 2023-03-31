import React, { useState } from "react";
import { useTodo } from "../context/useTodo";
import { Todo } from "../context/reducer";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  todo: Todo;
}
export const TodoItem = ({ todo }: Props) => {
  const { text, id, done } = todo;
  const [_, dispatch] = useTodo();

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const handleToggleTodo = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  return (
    <li className="flex h-12 items-center px-6 border-b-2 border-gray-100 gap-6 relative">
      <input
        type="checkbox"
        className="checkbox"
        checked={done}
        onChange={() => {
          handleToggleTodo();
        }}
      />
      <span className="text-lg">{text}</span>
      <XMarkIcon
        className="absolute right-3 w-8 h-8 cursor-pointer"
        onClick={() => {
          handleDelete();
        }}
      />
    </li>
  );
};
