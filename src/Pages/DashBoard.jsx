import { createNewBoard, createTasks, updateTask } from "../../helper";
import { AppContext } from "./MainLayout";
import { useContext } from "react";
import showSideBar from "../assets/icon-show-sidebar.svg";
import AddBoardForm from "../components/AddBoardForm";
import SideBarNav from "../components/SideBarNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import Board from "./Board";
import { useParams } from "react-router-dom";

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //Creating a new board
  if (_action === "createBoard") {
    try {
      createNewBoard(values);
      return toast.dark("You created a new board !", {
        className: "toastMessage",
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      throw new Error("There was a problem creating your board");
    }
  }

  if (_action === "updateTaskCard") {
    try {
      console.log(values)
      updateTask(values.taskId, values.columns)
      return toast.dark("You updated a task!", {
        className: "toastMessage",
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      throw new Error("There was a problem adding your task")
    }
  }
}


function DashBoard() {
  const {
    hidesidebarState,
    setHidesidebar,
    isModalOpen,
    closeModal,
    closeSidebarModal,
    sidebarModal,
    lightMode,
    boards,
  } = useContext(AppContext);
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  const params = useParams();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
      closeSidebarModal();
    }
  };

  const dashbaordStyle = {
    paddingLeft: isDesktopOrTablet
      ? hidesidebarState
        ? "0px"
        : "250px"
      : "0px",
  };
  const filteredBoard = boards.filter((board) => board.id === params.id)[0];

  const style = {
    backgroundColor: lightMode ? "white" : "#2b2c37",
    color: lightMode ? "black" : "white",
  };

  return (
    <div className="dashboard" style={dashbaordStyle}>
      <div
        className={`${isModalOpen || sidebarModal ? "modal" : ""}`}
        onClick={handleOutsideClick}
      >
        {sidebarModal && <SideBarNav />}
        {isModalOpen && <AddBoardForm />}
      </div>

      <div className="tasks-table-container">
        {boards && boards.length > 0 && <Board board={filteredBoard ? filteredBoard : boards[0]}/>}
        
      </div>

      {hidesidebarState && (
        <button
          className="showsidebar-btn"
          onClick={() => setHidesidebar(false)}
        >
          <img src={showSideBar} className="showsidebar-img" />
        </button>
      )}
    </div>
  );
}

export default DashBoard;
