//images
import logoLightImg from "../assets/logo-light.svg";
import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg"
import hideSideBar from "../assets/icon-hide-sidebar.svg"

//rrd
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-nav">
        <img src={logoLightImg} className="logo" />

        <h6>All boards (3)</h6>
        <div className="boards-list-container">
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

        <button className="btn create-board-btn">
          <img src={boardImg} className="boardIcon" />+ Create New Board
        </button>

        <footer className="boards-control-items">
          <img src={sunImg} />

          {/*Toggle swtich slider */}
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>

          <img src={moonImg} />
        </footer>

        <button className="btn btn-hide-sidebar"><img src={hideSideBar} />Hide Sidebar</button>
      </div>
    </div>
  );
}

export default SideBar;
