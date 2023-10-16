//images
import logoLightImg from "../assets/logo-light.svg";
import logoDarkImg from "../assets/logo-dark.svg";
import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg"
import hideSideBar from "../assets/icon-hide-sidebar.svg"

//rrd
import { NavLink } from "react-router-dom";

function SideBar({theme, changeTheme}) {
if (!theme) {
  document.body.style.backgroundColor = "rgb(32, 33, 44)"
} else {
  document.body.style.backgroundColor = "#f4f7fd"
}
  return (
    <div className="sidebar-container">
      <div className="sidebar-nav">
        <img src={theme ? logoDarkImg : logoLightImg} className="logo" />

        <h6>All boards (3)</h6>
        <div className={`boards-list-container ${theme ? "lightMode-links" : ""}`}>
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

        <button className={`btn create-board-btn ${theme ? "lightMode-btn" : ""}`}> 
          <img src={boardImg} className="boardIcon" />+ Create New Board
        </button>

        <footer className={`boards-control-items ${theme ? "boards-control-lightMode" : ""}`}>
          <img src={sunImg} />

          {/*Toggle swtich slider */}
          <label className="switch">
            <input type="checkbox" onClick={() => changeTheme()}/> 
            <span className="slider round"></span>
          </label>

          <img src={moonImg} />
        </footer>

        <button className={`btn btn-hide-sidebar ${theme ? "lightMode-btn" : ""}`}><img src={hideSideBar} />Hide Sidebar</button>
      </div>
    </div>
  );
}

export default SideBar;
