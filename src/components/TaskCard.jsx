import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Pages/MainLayout";
import menuImg from "../assets/icon-vertical-ellipsis.svg";
import { fetchData, updateTask } from "../../helper";

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [uncheckedCount, setUncheckedCount] = useState(0);
  

  useEffect(() => {
    const allTasks = fetchData("tasks") || [];
    setTasks(allTasks);
  }, []);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedTask(null);
    }
  };

  const boardColumns = [...allColumns];

  const handleSelectChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
    updateTask(task.id, event.target.value);
    setSelectedTask(false);
  };

  const updateCheckBox = (taskId, index, checkedVal) => {
    const updatedTasks = tasks.map((tasky) => {
      if (tasky.id === taskId) {
        const updatedColumnValues = tasky.columnValues.map(
          (columnValue, columnIndex) => {
            if (columnIndex === index) {
              return { ...columnValue, checked: checkedVal };
            }
            return columnValue;
          }
        );
        return { ...tasky, columnValues: updatedColumnValues };
      }
      return tasky;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };


  useEffect(() => {
    tasks.map(todo => {
      if (todo.id === task.id) {
        const count = todo.columnValues.reduce(
          (accumulator, columnValue) => (columnValue.checked ? accumulator : accumulator + 1),
          0
        );
        setUncheckedCount(count);
      }
    })
  }, [task.id, tasks])
  
  return (
    <div>
      {tasks.map((todo, index) => {
        if (todo.id === task.id) {
          return (
            <div
              className={task ? "modal" : ""}
              onClick={handleOutsideClick}
              key={index}
            >
              <div className="form-container">
                <div
                  className="form-wrapper"
                  style={{ backgroundColor: lightMode ? "#fff" : "#2b2c37" }}
                >
                  <div className="form">
                    <div className="header">
                      <h2>{todo.taskName}</h2>
                      <span>
                        <img src={menuImg} className="menu-img" />
                      </span>
                    </div>

                    <p className="task-description">{todo.description}</p>
                    <h5 className="subtasks-num">
                      Subtasks ({uncheckedCount} of {todo.columnValues.length}) left
                    </h5>

                    <div className="check-subtasks">
                      {todo.columnValues.map((subtask, index) => {
                        return (
                          <div className="check-field" key={index}>
                            <input
                              type="checkbox"
                              className="task-field"
                              onChange={() =>
                                updateCheckBox(todo.id, index, !subtask.checked)
                              }
                              checked={subtask.checked}
                              name={`task ${index + 1}`}
                            />

                            <span
                              className="subtask"
                              style={{
                                textDecoration: subtask.checked
                                  ? "line-through #828fa3"
                                  : "",
                                color: subtask.checked ? "#828fa3" : "",
                              }}
                            >
                              {subtask.task}
                            </span>
                          </div>
                        );
                      })}
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
                        <option value="">Select Status</option>
                        {boardColumns.map((column, index) => (
                          <option value={column} key={index} className="option">
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default TaskCard;