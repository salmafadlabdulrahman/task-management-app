import { useContext } from "react";
import crossImg from "../assets/icon-cross.svg";
import { AppContext } from "../Pages/MainLayout";

import { Form } from "react-router-dom";

function AddBoardForm() {
  const { lightMode } = useContext(AppContext);

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };
  return (
    <div className="form-container">
      <div className="form-wrapper" style={style}>
        <div className="form">
          <h2>Add New Board</h2>
          <Form method="post">
            <div className="form-fields">
              <label htmlFor="title" className={`title-field ${lightMode ? "lightMode-label" : ""}`}>
                Title <span className="required-sign">*</span>
              </label>
              <input
                className={`title ${lightMode ? `lightMode-input` : ""}`}
                type="text"
                name="title"
                placeholder="e.g. Take coffee break"
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
                <button type="submit" className="submit-board-btn">
                  Create New Board
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddBoardForm;
