import { useContext } from "react";
import { ThemeContext } from "./MainLayout";
import { fetchData } from "../../helper";
import { useLoaderData } from "react-router-dom";

export async function dashboardLoader() {
  const boards = await fetchData("boards") || [];
  return {boards}
}

function DashBoard({ theme }) {
  const { lightMode } = useContext(ThemeContext);
  const {boards} = useLoaderData()
  console.log(boards)
  const style = {
    backgroundColor: lightMode ? "white" : "#2b2c37",
    color: lightMode ? "black" : "white",
  };

  return (
    <div className="dashboard">
      <div className="tasks-table-container">
        {boards && boards.length > 0 ? (
          <h4>We have boards</h4>
        ) : (
          <div className="intro">
            <h3>Create a board</h3>
          </div>
          
        )}

      </div>
    </div>
  );
}

export default DashBoard;


{/*<div className="column">
          <h3 className="column-title">Todo (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Doing (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Study data structures</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Done (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className={`create-new-column ${!lightMode && "darkMode"}`}>
          <div className="create-column-btn">+ New Column</div>
        </div> */}