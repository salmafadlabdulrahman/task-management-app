import { useMediaQuery } from "react-responsive";
import { AppContext } from "../Pages/MainLayout";
import { useContext } from "react";

//Images
import logoImgMobile from "../assets/logo-mobile.svg";
import showBoardsImg from "../assets/icon-chevron-down.svg";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

//Hero Icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";

function NavBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 766px)" });
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });
  const params = useParams()

  const { lightMode, hidesidebarState, openSidebarModal, boards } =
    useContext(AppContext);

  const style = {
    left: isDesktopOrTablet ? (hidesidebarState ? "0px" : "250px") : "0px",
  };


  const currentBoard = boards.filter(board => board.id === params.id)[0]

  return (
    <div
      className={`navbar-container ${lightMode ? "lightMode-navbar" : ""}`}
      style={style}
    >
      <div className="main-nav">
        <div className="logo-board-container">
          {isMobile && <img src={logoImgMobile} />}
          <h2>{currentBoard?.title}</h2>
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
