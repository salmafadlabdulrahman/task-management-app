import { useContext } from "react";
import { AppContext } from "../Pages/MainLayout";
import { NavLink } from "react-router-dom";

import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg";

function SideBarNav() {
  const { lightMode, changeTheme, openModal, boards } = useContext(AppContext);
  return (
    <div
      className={`sidebar-container-component ${
        lightMode ? "lightMode-sidebar" : ""
      }`}
    >
      <div className="sidebar-nav">
        <h6>All boards (3)</h6>
        <div
          className={`boards-list-container ${
            lightMode ? "lightMode-links" : ""
          }`}
        >
          {/*<NavLink>
            <img src={boardImg} className="boardIcon" />
            Platform Launch
          </NavLink>
          <NavLink>
            <img src={boardImg} className="boardIcon" />
            Marketing Plan
          </NavLink>
          <NavLink>
            <img src={boardImg} className="boardIcon" />
            Roadmap
        </NavLink>*/}
          {boards.map((board, index) => (
            <NavLink key={index} to={`/dashboard/${board.id}`}>
              <img src={boardImg} className="boardIcon" />
              {board.title}
            </NavLink>
          ))}
        </div>

        <button
          className={`btn create-board-btn ${lightMode ? "lightMode-btn" : ""}`}
          onClick={() => openModal()}
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
  );
}

export default SideBarNav;
