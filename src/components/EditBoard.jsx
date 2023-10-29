import { useContext } from "react";
import { useFetcher } from "react-router-dom";
import { AppContext } from "../Pages/MainLayout";

function EditBoard({ setEditBoard, editBoard, boardInfo }) {
  const { lightMode } = useContext(AppContext);
  const fetcher = useFetcher();
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setEditBoard(false);
    }
  };

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  return (
    <div className={editBoard ? `modal` : ``} onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <h2>Edit Board</h2>
            <fetcher.Form method="post" name="editBoard">
            <div className="form-fields">
                
            </div>

            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBoard;
