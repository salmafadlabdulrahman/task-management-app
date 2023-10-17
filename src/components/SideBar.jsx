//images
import logoLightImg from "../assets/logo-light.svg";
import logoDarkImg from "../assets/logo-dark.svg";
import boardImg from "../assets/icon-board.svg";
import sunImg from "../assets/icon-light-theme.svg";
import moonImg from "../assets/icon-dark-theme.svg";
import hideSideBar from "../assets/icon-hide-sidebar.svg";

//rrd
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Pages/MainLayout";
//import AddBoardForm from "./AddBoardForm";
//import { createNewBoard } from "../../helper";

function SideBar() {
  const { lightMode, changeTheme, hidesidebarState, hideSidebar, displayNewBoardForm } = useContext(AppContext);
  //const [newBoardComponent, setNewBoardComponent] = useState(false)

  return (
    <div className="bigger-container">
      {!hidesidebarState && (
        <div className={`sidebar ${lightMode ? "lightMode-sidebar" : ""}`}>
          <div className="sidebar-container">
            <div className="sidebar-nav">
              <img
                src={lightMode ? logoDarkImg : logoLightImg}
                className="logo"
              />

              <h6>All boards (3)</h6>
              <div
                className={`boards-list-container ${
                  lightMode ? "lightMode-links" : ""
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
                className={`btn create-board-btn ${
                  lightMode ? "lightMode-btn" : ""
                }`}
                onClick={() => displayNewBoardForm()}
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

              <button
                className={`btn btn-hide-sidebar ${
                  lightMode ? "lightMode-btn" : ""
                }`}
                onClick={() => hideSidebar()}
              >
                <img src={hideSideBar} />
                Hide Sidebar
              </button>
            </div>
          </div>
        </div>
      )}

      

    </div>
  );
}

export default SideBar;

/*newBoardComponent ? console.log("You opened the form to create a new board") : console.log("it's not working!")*/