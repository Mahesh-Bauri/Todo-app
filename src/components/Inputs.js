import React from "react";
import { GrPowerReset } from "react-icons/gr";

function Inputs({ todo, setTodo, handleReset }) {
  function handleChange(e) {
    setTodo(e.target.value);
  }

  return (
    <div className="input-container">
      <input
        type="text"
        value={todo}
        onChange={handleChange}
        placeholder="Add new item"
      />
      <button onClick={handleReset}>
        {<GrPowerReset className="reset-btn" />}
      </button>
    </div>
  );
}

export default Inputs;
