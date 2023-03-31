import React, { useState, useRef } from "react";
import { useTodo } from "../context/useTodo";
import { Todo } from "../context/reducer";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ClickAwayListener from "react-click-away-listener";

interface Props {
  todo: Todo;
}
export const TodoItem = ({ todo }: Props) => {
  const { text, id, done } = todo;
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
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        text: "edited",
      },
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
      {!edit ? (
        <span
          className="text-lg text-stone-950 font-mono cursor-pointer w-full select-none overflow-auto mr-6"
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
            type="text"
            placeholder="change todo text"
            className="input input-bordered w-full mr-6"
          />
        </ClickAwayListener>
      )}
      <XMarkIcon
        className="absolute right-3 w-8 h-8 cursor-pointer"
        onClick={() => {
          handleDelete();
        }}
      />
    </li>
  );
};
