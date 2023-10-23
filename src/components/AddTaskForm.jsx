import { useContext, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { AppContext } from "../Pages/MainLayout";
import crossImg from "../assets/icon-cross.svg";

function AddTaskForm({addTaskForm, setTaskFunction}) {
  const { lightMode, boards, isModalOpen } = useContext(AppContext);
  const [boardTitle, setBoardTitle] = useState("");
  const [columnsField, setColumnsField] = useState([
    "e.g. Make coffee",
    "e.g. Drink coffee & smile",
  ]);
  const [formOpen, setFormOpen] = useState(true);
  const params = useParams();

  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";


  useEffect(() => {
    if (isSubmitting) {
      setFormOpen(false);

    }
  }, [isSubmitting]);

  const filteredBoard = boards.filter((board) => board.id === params.id)[0];

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  function addNewColumn(event) {
    event.preventDefault();
    const column = "Make coffee";
    setColumnsField([...columnsField, column]);
  }

  function deleteColumn(event, index) {
    event.preventDefault();
    const newColumns = [...columnsField];
    newColumns.splice(index, 1);
    setColumnsField(newColumns);
  }

  const allColumns = [];
  const boardKeys = Object.keys(filteredBoard ? filteredBoard : "");
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push(filteredBoard[key]);
    }
  });

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setTaskFunction(false)
    }
  };

  return (
    <div className={formOpen ? "modal" : ""} onClick={handleOutsideClick}>
      {formOpen && (
        <div className="form-container">
          <div className="form-wrapper" style={style}>
            <div className="form">
              <h2>Add New Task</h2>
              <fetcher.Form method="post" name="addtaskform">
                <div className="form-fields">
                  <label
                    htmlFor="taskName"
                    className={`task-name-field ${
                      lightMode ? "lightMode-label" : ""
                    }`}
                  >
                    Title <span className="required-sign">*</span>
                  </label>
                  <input
                    className={`title ${lightMode ? `lightMode-input` : ""}`}
                    type="text"
                    name="taskName"
                    id="taskName"
                    placeholder="e.g. Take coffee break"
                    onChange={(e) => setBoardTitle(e.target.value)}
                  />
                  <label htmlFor="description" className="description">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="description-field"
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
                  />

                  <div className="subtask-columns">
                    <h4
                      className={`columns-field ${
                        lightMode ? "lightMode-label" : ""
                      }`}
                    >
                      Subtasks
                    </h4>

                    {columnsField.map((column, index) => (
                      <div className="column-field" key={index} id={index}>
                        <input
                          className={`column ${
                            lightMode ? `lightMode-input` : ""
                          }`}
                          type="text"
                          name={`columns ${index + 1}`}
                          placeholder={`e.g. ${
                            index % 2 === 0
                              ? "Make coffee"
                              : "Drink coffee & smile"
                          }`}
                          style={{
                            border:
                              columnsField.length === 1
                                ? "1px solid #ea5555"
                                : "1px solid #3e3f4e",
                          }}
                        />
                        <button
                          className="cross-img"
                          onClick={(event) => deleteColumn(event, index)}
                          disabled={columnsField.length === 1}
                          style={{
                            cursor:
                              columnsField.length === 1
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          <img
                            src={crossImg}
                            style={{
                              cursor:
                                columnsField.length === 1
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
                    <label htmlFor="tasks" className="status">
                      Status
                    </label>
                    <select name="tasks" id="tasks" className="status-field">
                      {allColumns.map((column, index) => (
                        <option value={column} key={index} className="option">
                          {column}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="submit-task-btn">
                    Create Task
                  </button>
                  <input type="hidden" name="boardId" value={params.id} />

                  <input type="hidden" name="_action" value="addTask" />
                </div>
              </fetcher.Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
