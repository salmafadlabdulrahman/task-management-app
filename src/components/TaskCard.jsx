import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Pages/MainLayout";
import { useFetcher } from "react-router-dom";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [subtasks, setSubtasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (isSubmitting) {
      setSelectedTask(null);
    }
  });

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedTask(null);
    }
  };

  useEffect(() => {
    const columnKeys = Object.keys(task).filter((key) =>
      key.startsWith("column")
    );
    const columnValues = columnKeys?.map((key) => ({
      task: task[key],
      checked: false,
    }));
    setSubtasks(columnValues);
  }, [task]);

  const boardColumns = [...allColumns];

  function handleChange(index) {
    const updatedTasks = [...subtasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setSubtasks(updatedTasks);

    const completedCount = updatedTasks.filter((task) => task.checked).length;

    setCompletedTasks(completedCount);
  }

  const handleSelectChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
  };

  return (
    <div className={task ? "modal" : ""} onClick={handleOutsideClick}>
      <div className="form-container">
        <div
          className="form-wrapper"
          style={{ backgroundColor: lightMode ? "#fff" : "#2b2c37" }}
        >
          <div className="form">
            <div className="header">
              <h2>{task.taskName}</h2>
              <span>
                <img src={menuImg} className="menu-img" />
              </span>
            </div>
            <fetcher.Form method="post" name="display-card" id="myForm">
              <h5 className="subtasks-num">
                Subtasks ({completedTasks} of {subtasks.length}){" "}
                {subtasks.length === completedTasks ? "" : "left"}
              </h5>
              <div className="check-subtasks">
                {subtasks.map((subtask, index) => (
                  <div
                    className="check-field"
                    key={index}
                    style={{
                      backgroundColor: lightMode ? "#f4f7fd" : "#20212c",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="task-field"
                      checked={subtask.checked}
                      onChange={() => handleChange(index)}
                      name={`task ${index + 1}`}
                    />
                    <span className="subtask">{subtask.task}</span>
                  </div>
                ))}
              </div>

              <div className="select-menu">
                <label htmlFor="tasks" className="status">
                  Current Status
                </label>
                <select
                  name="columns"
                  id="columns"
                  className="status-field"
                  value={selectedValue}
                  onChange={() => handleSelectChange(event)}
                >
                  {boardColumns.map((column, index) => (
                    <option value={column} key={index} className="option">
                      {column}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-btns">
                <button type="submit" className="submit-board-btn">
                  Update Task
                </button>
              </div>
              
              <input type="hidden" name="taskId" value={task.id} />
              <input type="hidden" name="_action" value="updateTaskCard" />
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
