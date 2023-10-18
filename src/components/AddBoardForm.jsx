import { useContext, useEffect, useState } from "react";
import crossImg from "../assets/icon-cross.svg";
import { AppContext } from "../Pages/MainLayout";

import { useFetcher } from "react-router-dom";

/*no-symbol */

function AddBoardForm() {
  const { lightMode } = useContext(AppContext);
  const [boardTitle, setBoardTitle] = useState("");
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  useEffect(() => {
    if (isSubmitting) {
      if (boardTitle === "") {
        console.log("You need to fill this out")
      }
    }
  }, [isSubmitting])

  //Give each column in the board form a unique id, so each column doesn't overwrite the one before

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };
  return (
    <div className="form-container">
      <div className="form-wrapper" style={style}>
        <div className="form">
          <h2>Add New Board</h2>
          <fetcher.Form method="post">
            <div className="form-fields">
              <label htmlFor="title" className={`title-field ${lightMode ? "lightMode-label" : ""}`}>
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
                <label htmlFor="columns" className={`columns-field ${lightMode ? "lightMode-label" : ""}`}>
                  Columns
                </label>
                <div className="column-field">
                  <input
                    className={`column ${lightMode ? `lightMode-input` : ""}`}
                    type="text"
                    name="columns"
                    placeholder="e.g. Todo"
                    required
                  />
                  <span className="cross-img">
                    <img src={crossImg} />
                  </span>
                </div>
                <div className="column-field">
                  <input
                    className={`column ${lightMode ? `lightMode-input` : ""}`}
                    type="text"
                    name="columns"
                    placeholder="e.g. Doing"
                  />
                  <span className="cross-img">
                    <img src={crossImg} />
                  </span>
                </div>
              </div>

              <div className="form-btns">
                <button className={`add-new-column ${lightMode ? "lightMode-btn" : ""}`} >+ Add New Column</button>
                <input type="hidden" name="_action" value="createBoard" />
                <button type="submit" className="submit-board-btn" disabled={!boardTitle ? true : false}>
                  Create New Board
                </button>
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default AddBoardForm;
