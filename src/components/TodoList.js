import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todoList, handleCompelete }) {
  return (
    <div className="list-container">
      <ul className="list-items">
        {todoList.map((item) => {
          return (
            <TodoItem
              item={item}
              handleComelete={handleCompelete}
              key={item.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
