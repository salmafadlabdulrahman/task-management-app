import { useContext, useEffect /*, useRef*/, useState } from "react";
import crossImg from "../assets/icon-cross.svg";
import { AppContext } from "../Pages/MainLayout";

import { useFetcher } from "react-router-dom";

/*no-symbol */

function AddBoardForm() {
  const { lightMode, closeModal } = useContext(AppContext);
  const [boardTitle, setBoardTitle] = useState("");
  const [formOpen, setFormOpen] = useState(true);
  const [columnsField, setColumnsField] = useState(["Todo", "Doing"]);

  console.log(columnsField);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  //const formRef = useRef();

  useEffect(() => {
    if (isSubmitting) {
      /*if (boardTitle === "") {
        alert("Can't be empty");
      } else {
        setFormOpen(false);
        closeModal();
      }*/
      setFormOpen(false);
      closeModal();
    }
  }, [isSubmitting, closeModal]);

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  function addNewColumn(event) {
    event.preventDefault();
    const column = `New Column`;
    setColumnsField([...columnsField, column]);
    console.log(columnsField);
  }
  return (
    <>
      {formOpen && (
        <div className="form-container">
          <div className="form-wrapper" style={style}>
            <div className="form">
              <h2>Add New Board</h2>
              <fetcher.Form method="post">
                {" "}
                {/*ref={formRef} */}
                <div className="form-fields">
                  <label
                    htmlFor="title"
                    className={`title-field ${
                      lightMode ? "lightMode-label" : ""
                    }`}
                  >
                    Title <span className="required-sign">*</span>
                  </label>
                  <input
                    className={`title ${lightMode ? `lightMode-input` : ""}`}
                    type="text"
                    name="title"
                    placeholder="e.g. Take coffee break"
                    onChange={(e) => setBoardTitle(e.target.value)}
                  />

                  <div className="subtask-columns">
                    <label
                      htmlFor="columns"
                      className={`columns-field ${
                        lightMode ? "lightMode-label" : ""
                      }`}
                    >
                      Columns
                    </label>

                    {columnsField.map((column, index) => (
                      <div className="column-field" key={index}>
                        <input
                          className={`column ${
                            lightMode ? `lightMode-input` : ""
                          }`}
                          type="text"
                          name={`columns ${index + 1}`}
                          placeholder={`e.g. ${column}`}
                        />
                        <span className="cross-img">
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
                      + Add New Column
                    </button>
                    <input type="hidden" name="_action" value="createBoard" />
                    <button
                      type="submit"
                      className="submit-board-btn"
                      disabled={!boardTitle ? true : false}
                    >
                      Create New Board
                    </button>
                  </div>
                </div>
              </fetcher.Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBoardForm;

/*<div className="column-field">
                      <input
                        className={`column ${
                          lightMode ? `lightMode-input` : ""
                        }`}
                        type="text"
                        name={`column-${crypto.randomUUID()}`}
                        placeholder="e.g. Todo"
                      />
                      <span className="cross-img">
                        <img src={crossImg} />
                      </span>
                    </div>
                    <div className="column-field">
                      <input
                        className={`column ${
                          lightMode ? `lightMode-input` : ""
                        }`}
                        type="text"
                        name={`column-${crypto.randomUUID()}`}
                        placeholder="e.g. Doing"
                      />
                      <span className="cross-img">
                        <img src={crossImg} />
                      </span>
                    </div> */
