//images
import logoLightImg from "../assets/logo-light.svg";
import logoDarkImg from "../assets/logo-dark.svg";
import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg";
import hideSideBar from "../assets/icon-hide-sidebar.svg";
import showSideBar from "../assets/icon-show-sidebar.svg";

//rrd
import { NavLink } from "react-router-dom";
import { useState } from "react";

function SideBar({ theme, changeTheme }) {
  const [hidesidebar, setHidesidebar] = useState(false);

  function hideSidebar() {
    setHidesidebar((prev) => !prev);
  }
  return (
    <div className="bigger-container">
      
      <div className={`sidebar ${theme ? "lightMode-sidebar" : ""}`}>
        <div className="sidebar-container">
          <div className="sidebar-nav">
            <img src={theme ? logoDarkImg : logoLightImg} className="logo" />

            <h6>All boards (3)</h6>
            <div
              className={`boards-list-container ${
                theme ? "lightMode-links" : ""
              }`}
            >
              <NavLink>
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
              </NavLink>
            </div>

            <button
              className={`btn create-board-btn ${theme ? "lightMode-btn" : ""}`}
            >
              <img src={boardImg} className="boardIcon" />+ Create New Board
            </button>

            <footer
              className={`boards-control-items ${
                theme ? "boards-control-lightMode" : ""
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

            <button
              className={`btn btn-hide-sidebar ${theme ? "lightMode-btn" : ""}`}
              onClick={() => hideSidebar()}
            >
              <img src={hideSideBar} />
              Hide Sidebar
            </button>
          </div>
        </div>
      </div>
      <button className="showsidebar-btn"><img src={showSideBar} className="showsidebar-img" /></button>
    </div>
  );
}

export default SideBar;
/*onClick={() => hideSidebar()} */
