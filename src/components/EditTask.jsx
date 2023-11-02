import { useContext, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { AppContext } from "../Pages/MainLayout";
import crossImg from "../assets/icon-cross.svg";

function EditTask({ taskInfo, setEditTask, setSelectedTask, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [taskDetails, setTaskDetails] = useState(taskInfo);
  const [taskColumns, setTaskColumns] = useState([]);
  const fetcher = useFetcher();
  const params = useParams();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (isSubmitting) {
      setEditTask(false);
      setSelectedTask(false);
    }
  });

  useEffect(() => {
    const boardKeys = Object.keys(taskDetails);
    const columns = boardKeys.reduce((columnsArr, key) => {
      if (key.startsWith("columns")) {
        return [...columnsArr, taskDetails[key]];
      }
      return columnsArr;
    }, []);
    setTaskColumns(columns);
  }, [taskDetails]);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setEditTask(false);
    }
  };

  function addNewColumn(event) {
    event.preventDefault();
    const column = `New Column`;
    setTaskColumns([...taskColumns, column]);
  }

  function deleteColumn(event, index) {
    event.preventDefault();
    const newColumns = [...taskColumns];
    newColumns.splice(index, 1);
    setTaskColumns(newColumns);
  }

  const style = {
    backgroundColor: lightMode ? "#fff" : "#2b2c37",
  };

  
  return (
    <div className="modal edit-task-modal" onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <h2>Edit Task</h2>
            <fetcher.Form method="post" name="editTask">
              <div className="form-fields">
                <label
                  htmlFor="taskName"
                  className={`task-name-field ${
                    lightMode ? "lightMode-label" : ""
                  }`}
                >
                  Title
                </label>
                <input
                  className={`title ${lightMode ? `lightMode-input` : ""}`}
                  type="text"
                  name="taskName"
                  id="taskName"
                  placeholder="e.g. Take coffee break"
                  value={taskDetails.taskName}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, taskName: e.target.value })
                  }
                  required
                />

                <label htmlFor="description" className={`description ${lightMode ? "lightMode-label" : ""}`}>
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className={`description-field ${lightMode ? `lightMode-input` : ""}`}
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
                  value={taskDetails.description}
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      description: e.target.value,
                    })
                  }
                />

                <div className="subtask-columns">
                  <h4
                    className={`columns-field ${
                      lightMode ? "lightMode-label" : ""
                    }`}
                  >
                    Columns
                  </h4>

                  {taskColumns.map((column, index) => (
                    <div className="column-field" key={index}>
                      <input
                        className={`column ${
                          lightMode ? `lightMode-input` : ""
                        }`}
                        type="text"
                        name={`columns ${index + 1}`}
                        placeholder={`e.g. ${
                          index % 2 === 0 ? "Todo" : "Doing"
                        }`}
                        required
                        value={taskDetails[`columns ${index + 1}`]}
                        onChange={(e) =>
                          setTaskDetails({
                            ...taskDetails,
                            [`columns ${index + 1}`]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="cross-img"
                        onClick={(event) => deleteColumn(event, index)}
                        disabled={taskColumns.length === 1}
                        style={{
                          cursor:
                            taskColumns.length === 1
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <img
                          src={crossImg}
                          style={{
                            cursor:
                              taskColumns.length === 1
                                ? "not-allowed"
                                : "pointer",
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="form-btns">
                  <button
                    className={`add-new-column ${
                      lightMode ? "lightMode-btn" : ""
                    }`}
                    onClick={addNewColumn}
                  >
                    + Add New Subtask
                  </button>
                </div>

                <div className="select-menu">
                    <label htmlFor="tasks" className={`status ${lightMode ? "lightMode-label" : ""}`}>
                      Status
                    </label>
                    <select name="tasks" id="tasks" className={`status-field ${lightMode ? `lightMode-input` : ""}`} style={style} required>
                    <option value="" className={`option ${lightMode ? `lightMode-option` : ""}`} style={style}>Select Status</option>
                      {allColumns.map((column, index) => (
                        <option value={column.name} key={index} className="option" style={style}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                  </div>

                <button type="submit" className="submit-task-btn">
                  Save Changes
                </button>
                <input type="hidden" name="taskId" value={taskDetails.id} />
                <input type="hidden" name="boardId" value={params.id} />
                <input type="hidden" name="_action" value="editTask" />
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
