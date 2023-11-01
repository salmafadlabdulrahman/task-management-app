import { useContext } from "react";
import { deleteTask } from "../../helper";
import { AppContext } from "../Pages/MainLayout";

function DeleteTask({ setDeleteTask, taskInfo, setSelectedTask }) {
  const {lightMode} = useContext(AppContext)
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setDeleteTask(false);
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="form-container delete-form">
        <div className={`form-wrapper ${lightMode ? "menu-ligtmode" : ""}`}>
          <div className="form">
            <h3>Delete this task?</h3>
            <p className="warning-message">
              Are you sure you want to delete the{" "}
              <span className={`${lightMode ? "lightmode-title" : "darkmode-title"}`}>{taskInfo.taskName}</span> Task? This action will remove all
              columns and tasks and cannot be reversed.
            </p>

            <div className="delete-form-btns">
              <button
                className="delete-board"
                onClick={() => {
                  deleteTask(taskInfo.id);
                  setDeleteTask(false);
                  setSelectedTask(null)
                }}
              >
                Delete
              </button>
              <button className="cancel" onClick={() => {
                setDeleteTask(false)
                setSelectedTask(null)
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
