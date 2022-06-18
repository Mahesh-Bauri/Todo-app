import React from "react";
import { FaCircle, FaCheckCircle } from "react-icons/fa";

function TodoItem({ item, handleComelete }) {
  return (
    <li className="item" onClick={() => handleComelete(item.id)}>
      <span className={`todo-text ${item.isCompeleted && "strike"} `}>
        {item.text}
      </span>
      <span className="todo-icon">
        {item.isCompeleted ? (
          <FaCheckCircle className="compeleted" />
        ) : (
          <FaCircle className="inCompeleted" />
        )}
      </span>
    </li>
  );
}

export default TodoItem;
