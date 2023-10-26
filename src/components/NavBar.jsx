import { useMediaQuery } from "react-responsive";
import { AppContext } from "../Pages/MainLayout";
import { useContext, useState } from "react";

//Images
import logoImgMobile from "../assets/logo-mobile.svg";
import showBoardsImg from "../assets/icon-chevron-down.svg";
import menuImg from "../assets/icon-vertical-ellipsis.svg";

//Hero Icons
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import { useParams, NavLink } from "react-router-dom";
import AddTaskForm from "./AddTaskForm";

function NavBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 766px)" });
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });
  const params = useParams();
  const {
    lightMode,
    hidesidebarState,
    openSidebarModal,
    boards,
  } = useContext(AppContext);
  const [addtaskForm, setAddTaskForm] = useState(false);

  const style = {
    left: isDesktopOrTablet ? (hidesidebarState ? "0px" : "250px") : "0px",
  };

  const currentBoard = boards ? boards.filter((board) => board.id === params.id)[0] : [];

  return (
    <div
      className={`navbar-container ${lightMode ? "lightMode-navbar" : ""} `}
      style={style}
    >
      <div className="main-nav">
        <div className="logo-board-container">
          {isMobile && (
            <NavLink to="/dashboard">
              <img src={logoImgMobile} />
            </NavLink>
          )}
          <h2>{params.id ? currentBoard.title : "Overview"}</h2>
          {isMobile && (
            <button
              className="showBoards-btn"
              onClick={() => openSidebarModal()} 
            >
              <img src={showBoardsImg} width={12} className="showBoard-img" />
            </button>
          )}
        </div>

        {params.id ? (
          <div className="task-menu-container">
            <button
              className="btn btn-add-task"
              onClick={() => setAddTaskForm(true)}
            >
              {isMobile ? <PlusSmallIcon width={25} /> : "+ Add New Task"}
            </button>
            <img src={menuImg} />
          </div>
        ) : (
          ""
        )}

        {addtaskForm && (
          <AddTaskForm
            addTaskForm={addtaskForm}
            setTaskFunction={setAddTaskForm}
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
