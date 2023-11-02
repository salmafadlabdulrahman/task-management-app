import { useContext, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { AppContext } from "../Pages/MainLayout";
import crossImg from "../assets/icon-cross.svg";

function EditBoard({ setEditBoard, editBoard, boardInfo, allColumns }) {
  const { lightMode } = useContext(AppContext);
  const [boardDetails, setBoardDetails] = useState(boardInfo);
  const [boardColumns, setBoardColumns] = useState([]);

  useEffect(() => {
    const boardKeys = Object.keys(boardDetails);
    const columns = boardKeys.reduce((columnsArr, key) => {
      if (key.startsWith("columns")) {
        return [...columnsArr, boardDetails[key]];
      }
      return columnsArr;
    }, []);
    setBoardColumns(columns);
  }, [boardDetails]);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (isSubmitting) {
      setEditBoard(false);
    }
  });
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setEditBoard(false);
    }
  };

  function addNewColumn(event) {
    event.preventDefault();
    const column = `New Column`;
    setBoardColumns([...boardColumns, column]);
  }

  function deleteColumn(event, index) {
    event.preventDefault();
    const newColumns = [...boardColumns];
    newColumns.splice(index, 1);
    setBoardColumns(newColumns);
  }

  const style = {
    backgroundColor: lightMode ? "#fff" : "#2b2c37",
  };

  return (
    <div className={editBoard ? `modal` : ``} onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <h2>Edit Board</h2>
            <fetcher.Form method="post" name="editBoard">
              <div className="form-fields">
                <label
                  htmlFor="boardName"
                  className={`board-name-field ${
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
                  value={boardDetails.title}
                  onChange={(e) =>
                    setBoardDetails({ ...boardDetails, title: e.target.value })
                  }
                  required
                />

                <div className="subtask-columns">
                  <h4
                    className={`columns-field ${
                      lightMode ? "lightMode-label" : ""
                    }`}
                  >
                    Columns
                  </h4>

                  {boardColumns.map((column, index) => (
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
                        value={boardDetails[`columns ${index + 1}`]}
                        onChange={(e) =>
                          setBoardDetails({
                            ...boardDetails,
                            [`columns ${index + 1}`]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="cross-img"
                        onClick={(event) => deleteColumn(event, index)}
                        disabled={boardColumns.length === 1}
                        style={{
                          cursor:
                            boardColumns.length === 1
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <img
                          src={crossImg}
                          style={{
                            cursor:
                              boardColumns.length === 1
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
                    + Add New Column
                  </button>

                  <button type="submit" className="submit-board-btn">
                    Save Changes
                  </button>
                  <input type="hidden" name="id" value={boardDetails.id} />
                  <input type="hidden" name="oldboard" value={allColumns} />
                  <input type="hidden" name="_action" value="editBoard" />
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBoard;
