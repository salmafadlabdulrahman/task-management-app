import crossImg from "../assets/icon-cross.svg";

import { Form } from "react-router-dom";

function AddBoardForm() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <h2>Add New Board</h2>
          <Form method="post">
            <div className="form-fields">
              <label htmlFor="title" className="title-field">
                Title <span className="required-sign">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Take coffee break"
              />

              <div className="subtask-columns">
                <label htmlFor="columns" className="columns-field">
                  Columns
                </label>
                <div className="column-field">
                  <input
                    type="text"
                    name="columns"
                    id="column"
                    placeholder="e.g. Todo"
                  />
                  <span className="cross-img">
                    <img src={crossImg} />
                  </span>
                </div>
                <div className="column-field">
                  <input
                    type="text"
                    name="columns"
                    id="column"
                    placeholder="e.g. Doing"
                  />
                  <span className="cross-img">
                    <img src={crossImg} />
                  </span>
                </div>
              </div>

              <div className="form-btns">
                <button className="add-new-column">+ Add New Column</button>
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
