import { fetchData } from "../../helper";
import { useLoaderData } from "react-router-dom";
import { AppContext } from "./MainLayout";
import { useContext } from "react";
import showSideBar from "../assets/icon-show-sidebar.svg";

export async function dashboardLoader() {
  const boards = (await fetchData("boards")) || [];
  return { boards };
}

function DashBoard() {
  const { boards } = useLoaderData();
  const { hidesidebarState, setHidesidebar } = useContext(AppContext);

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
      {hidesidebarState && (
        <button
          className="showsidebar-btn"
          onClick={() => setHidesidebar(false)}
        >
          <img src={showSideBar} className="showsidebar-img" />
        </button>
      )}
    </div>
  );
}

export default DashBoard;

/*{hidesidebarState && (
        <button
          className="showsidebar-btn"
          onClick={() => setHidesidebar(false)}
        >
          <img src={showSideBar} className="showsidebar-img" />
        </button>
      )} */

{
  /*<div className="column">
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
        </div> */
}
