import { createNewBoard, createTasks, editTask, updateBoard } from "../../helper";
import { AppContext } from "./MainLayout";
import { useContext, useState } from "react";
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

  if (_action === "addTask") {
    try {
      createTasks({ values, boardId: values.boardId });
      return toast.dark("You added a task!", {
        className: "toastMessage",
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      throw new Error("There was a problem adding your task");
    }
  }

  if (_action === "editBoard") {
    try {
      updateBoard(values, values.oldboard)
      return toast.dark("Board Successfully Updated!", {
        className: "toastMessage",
        position: toast.POSITION.TOP_CENTER,
      });
    } catch(err) {
      throw new Error("There was a problem updating your board")
    }
  }

  if (_action === "editTask") {
    try {
      editTask(values.taskId, values, values.boardId)
      return toast.dark("Task Successfully Updated!", {
        className: "toastMessage",
        position: toast.POSITION.TOP_CENTER,
      });
    } catch(err) {
      throw new Error("There was a problem updating your task")
    }
  }
}

function DashBoard() {
  const {
    hidesidebarState,
    setHidesidebar,
    sidebarModal,
    boards,
    newBoardForm,
    setNewBoardForm,
  } = useContext(AppContext);
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });
  const [boardForm, setBoardForm] = useState(false);
  const params = useParams();

  //localStorage.clear()

  const dashbaordStyle = {
    paddingLeft: isDesktopOrTablet
      ? hidesidebarState
        ? "0px"
        : "250px"
      : "0px",
  };
  const currentBoard = boards
    ? boards.filter((board) => board.id === params.id)[0]
    : [];
  return (
    <div className="dashboard" style={dashbaordStyle}>
      <div>
        {sidebarModal && <SideBarNav />}
        {newBoardForm && <AddBoardForm setBoardForm={setBoardForm} />}
      </div>

      <div className="tasks-table-container">
        {params.id && boards && boards.length > 0 ? (
          <Board currentBoard={currentBoard} />
        ) : (
          <div className="beginning-message">
            <h2>Hello there! Create a board</h2>
            <button onClick={() => setNewBoardForm(true)}>
              Create a board
            </button>
          </div>
        )}
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