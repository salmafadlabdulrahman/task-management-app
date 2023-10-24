import { useContext } from "react";
import { AppContext } from "../Pages/MainLayout";
import { useFetcher } from "react-router-dom";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const fetcher = useFetcher();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedTask(null);
    }
  };

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  const taskKeys = Object.keys(task);
  const subtasks = [];
  taskKeys.forEach((key) => {
    if (key.startsWith("column")) {
      subtasks.push(task[key]);
    }
  });

  const boardColumns = [...allColumns];

  return (
    <div className={task ? "modal" : ""} onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <div className="header">
              <h2>{task.taskName}</h2>
              <span>
                <img src={menuImg} className="menu-img"/>
              </span>
            </div>
            <fetcher.Form method="post" name="display-card">
              <h5 className="subtasks-num">Subtasks (1 of {subtasks.length}) </h5>
              <div className="check-subtasks">
                {subtasks.map((subtask, index) => (
                  <div className="check-field" key={index}>
                    <input type="checkbox" className="task-field" />
                    <span className="subtask">{subtask}</span>
                  </div>
                ))}
              </div>

              <div className="select-menu">
                <label htmlFor="tasks" className="status">
                  Current Status
                </label>
                <select name="columns" id="columns" className="status-field">
                  {boardColumns.map((column, index) => (
                    <option value={column} key={index} className="option">
                      {column}
                    </option>
                  ))}
                </select>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
