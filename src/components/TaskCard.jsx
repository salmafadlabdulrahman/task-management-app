import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Pages/MainLayout";
import { useFetcher } from "react-router-dom";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

function TaskCard({ task, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [subtasks, setSubtasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    document.getElementById('myForm').submit();
  };

  const fetcher = useFetcher();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedTask(null);
    }
  };

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  useEffect(() => {
    const columnKeys = Object.keys(task).filter((key) =>
      key.startsWith("column")
    );
    const columnValues = columnKeys?.map((key) => ({
      task: task[key],
      checked: false
    }));
    setSubtasks(columnValues);
  }, [task]);

  const boardColumns = [...allColumns];

  function handleChange(index) {
    const updatedTasks = [...subtasks]
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setSubtasks(updatedTasks);

    const completedCount = updatedTasks.filter(task => task.checked).length;
    
    setCompletedTasks(completedCount);
  }

  /*function handleSubmit(event) {
    event.preventDefault();

  }*/
  

  return (
    <div className={task ? "modal" : ""} onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <div className="header">
              <h2>{task.taskName}</h2>
              <span>
                <img src={menuImg} className="menu-img" />
              </span>
            </div>
            <fetcher.Form method="post" name="display-card" id="myForm" >
              <h5 className="subtasks-num">
                Subtasks ({completedTasks} of {subtasks.length}) {subtasks.length === completedTasks ? "" : "left"}
              </h5>
              <div className="check-subtasks">
                {subtasks.map((subtask, index) => (
                  <div className="check-field" key={index}>
                    <input type="checkbox" className="task-field" checked={subtask.checked} onChange={() => handleChange(index)}/>
                    <span className="subtask">{subtask.task}</span>
                  </div>
                ))}
              </div>

              <div className="select-menu">
                <label htmlFor="tasks" className="status">
                  Current Status
                </label>
                <select name="columns" id="columns" className="status-field" onChange={handleSelectChange}>
                  {boardColumns.map((column, index) => (
                    <option value={column} key={index} className="option">
                      {column}
                    </option>
                  ))}
                </select>
                <input type="hidden" name="_action" value="updateTaskCard" />
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
