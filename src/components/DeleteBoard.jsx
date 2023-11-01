import { useContext } from "react";
import { deleteBoard } from "../../helper";
import { AppContext } from "../Pages/MainLayout";

function DeleteBoard({ boardInfo, setDeleteBoard }) {
  const {lightMode} = useContext(AppContext)
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
        setDeleteBoard(false);
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="form-container delete-form">
        <div className={`form-wrapper ${lightMode ? "menu-ligtmode" : ""}`}>
          <div className="form">
            <h3>Delete this board?</h3>
            <p className="warning-message">
              Are you sure you want to delete the <span className={`${lightMode ? "lightmode-title" : "darkmode-title"}`}>{boardInfo.title}</span> board? This
              action will remove all columns and tasks and cannot be reversed.
            </p>

            <div className="delete-form-btns">
              <button className="delete-board" onClick={() => {
                deleteBoard(boardInfo.id);
                setDeleteBoard(false);
              }}>Delete</button>
              <button className="cancel" onClick={() => setDeleteBoard(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBoard;