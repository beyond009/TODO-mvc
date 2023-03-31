import React, { useState, useRef } from "react";
import { useTodo } from "../context/useTodo";
import { Todo } from "../context/reducer";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ClickAwayListener from "react-click-away-listener";
import "./TodoItem.css";

interface Props {
  todo: Todo;
}
export const TodoItem = ({ todo }: Props) => {
  const { text, id, done } = todo;
  const inputRef = useRef<HTMLInputElement>(null);
  const [_, dispatch] = useTodo();
  const [edit, setEdit] = useState<boolean>(false);

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

  const handleEdit = () => {
    const text = inputRef.current?.value;
    if (text) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id,
          text: text,
        },
      });
      setEdit(false);
    }
  };

  return (
    <li className="todo-item flex h-12 items-center px-6 border-b-2 border-gray-100 gap-6 relative">
      <input
        type="checkbox"
        className="checkbox"
        checked={done}
        onChange={() => {
          handleToggleTodo();
        }}
      />
      {!edit ? (
        <span
          className={`text-lg font-mono cursor-pointer w-full select-none overflow-auto mr-6 ${
            done ? "line-through text-gray-400" : "text-stone-950"
          }`}
          onDoubleClick={() => {
            setEdit(true);
          }}
        >
          {text}
        </span>
      ) : (
        <ClickAwayListener
          onClickAway={() => {
            setEdit(false);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="change todo text"
            className="input input-bordered w-full mr-6"
            onKeyDown={(e) => {
              e.key === "Enter" && handleEdit();
            }}
          />
        </ClickAwayListener>
      )}
      <XMarkIcon
        className="delete-icon absolute right-3 w-8 h-8 cursor-pointer"
        onClick={() => {
          handleDelete();
        }}
      />
    </li>
  );
};
