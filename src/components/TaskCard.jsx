import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Pages/MainLayout";
import menuImg from "../assets/icon-vertical-ellipsis.svg";
import { fetchData, updateTask } from "../../helper";
//updateCheckBox,

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState("");
  //const [checkboxValues, setCheckboxValues] = useState([])

  // console.log(task.columnValues.map(subtask => subtask.checked[0]))

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedTask(null);
    }
  };

  const boardColumns = [...allColumns];

  //console.log(checkboxValues[0])

  const handleSelectChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
    updateTask(task.id, event.target.value);
    setSelectedTask(false);
  };

  

  const updateCheckBox = (taskId, index, checkedVal) => {
    const tasks = fetchData("tasks") ?? [];
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedColumnValues = task.columnValues.map(
          (columnValue, columnIndex) => {
            if (columnIndex === index) {
              return { ...columnValue, checked: checkedVal };
            }
            return columnValue;
          }
        );
        return { ...task, columnValues: updatedColumnValues };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log("component rendered");
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
            <h5 className="subtasks-num">
              Subtasks (0 of 3)
              {/*task.columnValues.length === completedTasks ? "" : "left"*/}
            </h5>
            <div className="check-subtasks">
              {task.columnValues.map((box, index) => (
                <div key={index}>
                  <input type="checkbox" checked={box.checked} onChange={() => updateCheckBox(task.id, index, !box.checked)} />
                  <h2>{box.task}</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

/*{task.columnValues.map((subtask, index) => (
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
                    name={`task ${index + 1}`}
                    onChange={() =>
                      updateCheckBox(task.id, index, !subtask.checked)
                    } //handleCheckboxChange(index)
                    checked={console.log(subtask.checked)} //subtask.checked
                  />

                  <span className="subtask">{subtask.task}</span>
                </div>
              ))} */

/*useEffect(() => {
    const allTasks = fetchData("tasks") || [];
    setTasks(allTasks);
  }, []);*/

//const [tasks, setTasks] = useState([]);
//const [completedTasks, setCompletedTasks] = useState(0);

/*const updatedTasks = [...tasks];

   /* const newTask = {
      ...updatedTasks[tasks.findIndex((curr) => curr.id === task.id)],
    };
    console.log(newTask);

    newTask.columnValues[index].checked = !newTask.columnValues[index].checked;
    updatedTasks[index] = newTask;

    setTasks(updatedTasks);
    

    const updatedTasksString = JSON.stringify(updatedTasks);
  localStorage.setItem('tasks', updatedTasksString);
---
const foundedTask = updatedTasks.filter(currentTask => currentTask.id === task.id)[0]

foundedTask.columnValues[index].checked = !foundedTask.columnValues[index].checked
//setTasks(updatedTasks);
setTasks(updatedTasks[0].columnValues);
//console.log(updatedTasks[0].columnValues)


const updatedTasksString = JSON.stringify(updatedTasks);


localStorage.setItem('tasks', updatedTasksString); */
