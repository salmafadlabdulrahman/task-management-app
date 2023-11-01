import { redirect } from "react-router-dom";
import { deleteBoard } from "../../helper";

function DeleteBoard({ boardInfo, setDeleteBoard }) {
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
        setDeleteBoard(false);
    }
  };
  console.log(boardInfo.id)

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="form-container delete-form">
        <div className="form-wrapper">
          <div className="form">
            <h3>Delete this board?</h3>
            <p className="warning-message">
              Are you sure you want to delete the <span>{boardInfo.title}</span> board? This
              action will remove all columns and tasks and cannot be reversed.
            </p>

            <div className="delete-form-btns">
              <button className="delete-board" onClick={() => {
                deleteBoard(boardInfo.id);
                setDeleteBoard(false);
                //redirect("/")
              }}>Delete</button>
              <button className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBoard;