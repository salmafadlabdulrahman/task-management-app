//rs imports
import { useMediaQuery } from "react-responsive";

//Images
import logoImgMobile from "../assets/logo-mobile.svg";
import showBoardsImg from "../assets/icon-chevron-down.svg";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

//Hero Icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function NavBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 766px)" });

  return (
    <div className="navbar-container">
      <div className="main-nav">
          <div className="logo-board-container">
            {isMobile && <img src={logoImgMobile} />}
            <h2>Platform Launch</h2>
            {isMobile && (
              <img src={showBoardsImg} width={12} className="showBoard-img" />
            )}
          </div>

          <div className="task-menu-container">
            <button className="btn btn-add-task">
              {isMobile ? <PlusSmallIcon width={25} /> : "+ Add New Task"}
            </button>
            <img src={menuImg} />
          </div>
      </div>
    </div>
  );
}

export default NavBar;
