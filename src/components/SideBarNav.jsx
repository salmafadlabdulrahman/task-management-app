import { useContext } from "react";
import { AppContext } from "../Pages/MainLayout";
import { NavLink } from "react-router-dom";

import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg";

function SideBarNav() {
  const {
    lightMode,
    changeTheme,
    sidebarModal,
    closeSidebarModal,
    boards,
    setNewBoardForm
  } = useContext(AppContext);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeSidebarModal()
    }
  };

  return (
    <div className={sidebarModal ? "modal" : ""} onClick={handleOutsideClick}>
      <div
        className={`sidebar-container-component ${
          lightMode ? "lightMode-sidebar" : ""
        }`}
      >
        <div className="sidebar-nav">
          <h6>All boards ({boards.length})</h6>
          <div
            className={`boards-list-container ${
              lightMode ? "lightMode-links" : ""
            }`}
          >
            {boards.map((board, index) => (
              <NavLink key={index} to={`/dashboard/${board.id}`}>
                <img src={boardImg} className="boardIcon" />
                {board.title}
              </NavLink>
            ))}
          </div>

          <button
            className={`btn create-board-btn ${
              lightMode ? "lightMode-btn" : ""
            }`}
            onClick={() => setNewBoardForm(true)}
          >
            <img src={boardImg} className="boardIcon" />+ Create New Board
          </button>

          <footer
            className={`boards-control-items ${
              lightMode ? "boards-control-lightMode" : ""
            }`}
          >
            <img src={sunImg} />

            {/*Toggle swtich slider */}
            <label className="switch">
              <input type="checkbox" onClick={() => changeTheme()} />
              <span className="slider round"></span>
            </label>

            <img src={moonImg} />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SideBarNav;
