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
import EditBoard from "./EditBoard";

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
  const [openMenu, setOpenMenu] = useState(false);
  const [editBoard, setEditBoard] = useState(false)

  const style = {
    left: isDesktopOrTablet ? (hidesidebarState ? "0px" : "250px") : "0px",
  };

  const currentBoard = boards ? boards.filter((board) => board.id === params.id)[0] : [];

  const allColumns = [];
  const boardKeys = Object.keys(currentBoard ?? []);
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push(currentBoard[key]);
    }
  });

  return (
    <div
      className={`navbar-container ${lightMode ? "lightMode-navbar" : ""} `}
      style={style}
    >
      <div className="main-nav">
        <div className="logo-board-container">
          {isMobile && (
            <NavLink to="/">
              <img src={logoImgMobile} />
            </NavLink>
          )}
          <h2>{boards && boards.length > 0 ? currentBoard?.title : "Overview"}</h2>
          {isMobile && (
            <button
              className="showBoards-btn"
              onClick={() => openSidebarModal()} 
            >
              <img src={showBoardsImg} width={12} className="showBoard-img" />
            </button>
          )}
        </div>

        {params.id && boards && boards.length > 0 ? (
          <div className="task-menu-container">
            <button
              className="btn btn-add-task"
              onClick={() => setAddTaskForm(true)}
            >
              {isMobile ? <PlusSmallIcon width={25} /> : "+ Add New Task"}
            </button>
            <img src={menuImg} className="menu-img" onClick={() => setOpenMenu(prev => !prev)}/>
            {openMenu && (
              <div className="menu-container">
                <h4 className="editboard-btn" onClick={() => {
                  setEditBoard(true)
                  setOpenMenu(false)
                }}>Edit Board</h4>
                <h4 className="deleteboard-btn">Delete Board</h4>
              </div>
            )}
            {editBoard && <EditBoard setEditBoard={setEditBoard} editBoard={editBoard} boardInfo={currentBoard} allColumns={allColumns} />}
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
