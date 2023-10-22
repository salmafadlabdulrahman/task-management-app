import { useContext, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { AppContext } from "../Pages/MainLayout";
import crossImg from "../assets/icon-cross.svg";

function AddTaskForm() {
  const fetcher = useFetcher();
  const { lightMode, boards } = useContext(AppContext);
  const [boardTitle, setBoardTitle] = useState("");
  const [columnsField, setColumnsField] = useState([
    "e.g. Make coffee",
    "e.g. Drink coffee & smile",
  ]);
  const params = useParams();

  const filteredBoard = boards.filter((board) => board.id === params.id)[0];

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  function addNewColumn(event) {
    event.preventDefault();
    /*const column = `New column`;*/
    const column = (allColumns.length - 1) % 2 === 0 ? "Make coffee" : "Drink coffee & smile"
    setColumnsField([...columnsField, column]);
    console.log(columnsField);
  }

  function deleteColumn(event) {
    //event.preventDefault();
    const deletedColumn = event.target.parentNode.parentNode;
    /*deletedColumn.remove()*/
    //console.log(deletedColumn.id)
    //setColumnsField(prev => prev.slice(deletedColumn.id))
    setColumnsField([...columnsField.splice(deletedColumn.id, 1)]);
    console.log(columnsField);
  }

  const allColumns = [];
  const boardKeys = Object.keys(filteredBoard);
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push(filteredBoard[key]);
    }
  });

  return (
    <div className="form-container">
      <div className="form-wrapper" style={style}>
        <div className="form">
          <h2>Add New Task</h2>
          <fetcher.Form method="post" name="addtaskform">
            <div className="form-fields">
              <label
                htmlFor="task-name"
                className={`task-name-field ${
                  lightMode ? "lightMode-label" : ""
                }`}
              >
                Title <span className="required-sign">*</span>
              </label>
              <input
                className={`title ${lightMode ? `lightMode-input` : ""}`}
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Take coffee break"
                onChange={(e) => setBoardTitle(e.target.value)}
              />
              <label htmlFor="description" className="description">
                Description
              </label>
              <input
                type="text"
                name="description"
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
                    {/*with the help of the id prop I can use the slice method to delete the column from the columns array and update it */}
                    <input
                      className={`column ${lightMode ? `lightMode-input` : ""}`}
                      type="text"
                      name={`columns ${index + 1}`}
                      placeholder={`e.g. ${column}`}
                    />
                    <span className="cross-img" onClick={deleteColumn}>
                      <img src={crossImg} />
                    </span>
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

                <input type="hidden" name="_action" value="addNewTask" />
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
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;
