import { useMediaQuery } from "react-responsive";
import { AppContext } from "../Pages/MainLayout";
import { useContext } from "react";

//Images
import logoImgMobile from "../assets/logo-mobile.svg";
import showBoardsImg from "../assets/icon-chevron-down.svg";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

//Hero Icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function NavBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 766px)" });
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  const { lightMode, hidesidebarState, openSidebarModal } =
    useContext(AppContext);

  const style = {
    left: isDesktopOrTablet ? (hidesidebarState ? "0px" : "250px") : "0px",
  };

  return (
    <div
      className={`navbar-container ${lightMode ? "lightMode-navbar" : ""}`}
      style={style}
    >
      <div className="main-nav">
        <div className="logo-board-container">
          {isMobile && <img src={logoImgMobile} />}
          <h2>Coding</h2>
          {isMobile && (
            <button
              className="showBoards-btn"
              onClick={() => openSidebarModal()}
            >
              <img src={showBoardsImg} width={12} className="showBoard-img" />
            </button>
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
