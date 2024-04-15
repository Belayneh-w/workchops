import "./index.css";
import Todo from "../../types";
import { ChangeEvent } from "react";
import "./index.css";

type Props = {
  id: string;
  name: string;
  done: boolean;
  onUpdateTodo: (id: string) => void;
  onDeleteTodoById: (id: string) => void;
};
export default function Item(props: Props) {
  const { id, name, done, onUpdateTodo, onDeleteTodoById } = props;

  const onChangeCkeckbox = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateTodo(id);
  };

  const onDeleteItem = () => {
    if (window.confirm("Are You Sure You want to delete?")) {
      onDeleteTodoById(id);
    }
  };
  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={onChangeCkeckbox} />
        {/* <input type="checkbox" checked={done} onChange={()=>onUpdateTodo(id)} /> */}

        <span>{name}</span>
      </label>
      <button className="btn btn-danger" onClick={onDeleteItem}>
        Delete
      </button>
    </li>
  );
}
