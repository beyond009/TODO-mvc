import React, { useState } from "react";
import { useTodo } from "../context/useTodo";
import { Todo } from "../context/reducer";
interface Props {
  todo: Todo;
}
export const TodoItem = ({ todo }: Props) => {
  const { text, id, done } = todo;
  return (
    <li className="flex h-12 items-center px-6 border-b-2 border-gray-100 gap-6">
      <input type="checkbox" className="checkbox" />
      <span className="text-lg">{text}</span>
    </li>
  );
};
