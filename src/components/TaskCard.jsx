import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Pages/MainLayout";
import menuImg from "../assets/icon-vertical-ellipsis.svg";
import { fetchData, updateTask } from "../../helper";
import { useParams } from "react-router-dom";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode, boards } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [uncheckedCount, setUncheckedCount] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const params = useParams()

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

  const currentBoard = boards
    ? boards.filter((board) => board.id === params.id)[0]
    : [];

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
    tasks.map((todo) => {
      if (todo.id === task.id) {
        const count = todo.columnValues.reduce(
          (accumulator, columnValue) =>
            columnValue.checked ? accumulator + 1 : accumulator,
          0
        );
        setUncheckedCount(count);
      }
    });
  }, [task.id, tasks]);



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
                        <img
                          src={menuImg}
                          className="menu-img"
                          onClick={() => setOpenMenu((prev) => !prev)}
                        />
                      </span>
                    </div>
                    {openMenu && (
                      <div className={`menu-container task-menu ${lightMode ? "menu-ligtmode" : ""}`}>
                        <h4
                          className="editboard-btn"
                          onClick={() => {
                            setEditTask(true);
                            setOpenMenu(false);
                          }}
                        >
                          Edit Task
                        </h4>
                        <h4
                          className="deleteboard-btn"
                          onClick={() => {
                            setDeleteTask(true);
                            setOpenMenu(false);
                          }}
                        >
                          Delete Task
                        </h4>
                      </div>
                    )}
                    {editTask && (
                      <EditTask
                        setEditTask={setEditTask}
                        editTask={editTask}
                        taskInfo={task}
                        allColumns={allColumns}
                        setSelectedTask={setSelectedTask}
                      />
                    )}
                    

                    {deleteTask && (
                      <DeleteTask
                        setDeleteTask={setDeleteTask}
                        boardInfo={currentBoard}
                        taskInfo={task}
                        setSelectedTask={setSelectedTask}
                      />
                    )}

                    <p className="task-description">{todo.description}</p>
                    <h5 className="subtasks-num">
                      Subtasks ({uncheckedCount} of {todo.columnValues.length})
                    </h5>

                    <div className="check-subtasks">
                      {todo.columnValues.map((subtask, index) => {
                        return (
                          <div className={`check-field ${lightMode ? "lightMode-check-field" : ""}`} key={index}>
                            <input
                              type="checkbox"
                              className={`task-field`}
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
                      <label htmlFor="tasks" className={`status ${lightMode ? "lightMode-label" : ""}`}>
                        Current Status
                      </label>
                      <select
                        name="columns"
                        id="columns"
                        
                        className={`status-field ${lightMode ? `lightMode-input` : ""} `}
                        value={selectedValue}
                        onChange={() => handleSelectChange(event)}
                      >
                        <option value="" className={`option ${lightMode ? `lightMode-option` : ""}`}>Select Status</option>
                        {boardColumns.map((column, index) => (
                          <option value={column.name} key={index} className={`option ${lightMode ? `lightMode-option` : ""}`}>
                            {column.name}
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