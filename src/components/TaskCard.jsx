import { useContext } from "react";
import { AppContext } from "../Pages/MainLayout";

function TaskCard({ taskCard, setTaskCard, task }) {
    const {lightMode} = useContext(AppContext)
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log(taskCard);
      setTaskCard(false);
    }
  };

  const style = {
    backgroundColor: lightMode ? "rgb(238, 239, 255)" : "#2b2c37",
  };

  console.log(task)

  return (
    <div className={taskCard ? "modal" : ""} onClick={handleOutsideClick}>
      <div className="form-container">
        <div className="form-wrapper" style={style}>
          <div className="form">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
