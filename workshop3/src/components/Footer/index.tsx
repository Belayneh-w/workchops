import React from "react";

import "./index.css";
import Todo from "../../types";

type Props = {
  todos: Todo[];
  onCheckAll: () => void;
  onDeleteFinishedTasks: () => void;
};

export default function Footer(props: Props) {
  const { todos, onCheckAll, onDeleteFinishedTasks } = props;

  const finishedTasksCount = todos.filter((task) => task.done).length;
  const deleteFinishedTasks = () => {
    if (window.confirm("Are You Sure You want to Delete ALL Fished Tasks?")) {
      onDeleteFinishedTasks();
    }
  };

  return (
    <div className="todo-footer">
      <label>
        <input
          type="checkbox"
          checked={
            todos.filter((task) => task.done).length === todos.length &&
            todos.length !== 0
          }
          onChange={onCheckAll}
        />
      </label>
      <span>
        <span>Finished {finishedTasksCount}</span> / total {todos.length}
      </span>
      <button className="btn btn-danger" onClick={deleteFinishedTasks}>
        Delete Finished Tasks
      </button>
    </div>
  );
}
