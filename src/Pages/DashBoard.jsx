import { createNewBoard } from "../../helper";
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

  console.log(values);

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
    backgroundColor: lightMode ? "white" : "#2b2c37", //rgb(238, 239, 255)
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
        <Board board={filteredBoard}/>



        {/*{boards && boards.length > 0 ? (
          boards.map((board, index) => (
            <Board />
          ))
        ) : (
          <h1>Create a board</h1>
        )} */}
        <div className={`create-new-column ${!lightMode && "darkMode"}`}>
          <div className="create-column-btn">+ New Column</div>
        </div>
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


/*<div className="task-column" key={index}>
              <h3 className="column-title">
                <span
                  className="circle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#49c4e5" : "#635fc7",
                  }}
                ></span>
                Todo (4)
              </h3>

              {/*<div className={`task-card`} style={style}>
                <h3 className="task-title">{board.title}</h3>
                <h5 className="task-count">1 of 3 subtasks</h5>
              </div> 
              </div> */

/*<div className="task-column" key={index}>
              <h3 className="column-title">
                <span
                  className="circle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#49c4e5" : "#635fc7",
                  }}
                ></span>
                Todo (4)
              </h3>

              <div className={`task-card`} style={style}>
                <h3 className="task-title">{board.title}</h3>
                <h5 className="task-count">1 of 3 subtasks</h5>
              </div>
            </div> */

/*<div className="tasks-table-container">
        <Board board={filteredBoard} />
      </div> */

/*{boards && boards.length > 0 ? (
          boards.map((board, index) => (
            <div className="task-column" key={index}>
              <h3 className="column-title">
                <span
                  className="circle"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#49c4e5" : "#635fc7",
                  }}
                ></span>
                Todo (4)
              </h3>

              <div className={`task-card`} style={style}>
                <h3 className="task-title">{board.title}</h3>
                <h5 className="task-count">1 of 3 subtasks</h5>
              </div>
            </div>
          ))
        ) : (
          <h1>Create a board</h1>
        )} */

{
  /* : (
          <div className="intro">
            <h3>Create a board</h3>
          </div>
        ) */
}
{
  /*<div className="column">
          <h3 className="column-title">Todo (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Doing (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Study data structures</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className="column">
          <h3 className="column-title">Done (4)</h3>

          <div className={`task-card`} style={style}>
            <h3 className="task-title">Build UI for onboarding flow</h3>
            <h5 className="task-count">1 of 3 subtasks</h5>
          </div>
        </div>

        <div className={`create-new-column ${!lightMode && "darkMode"}`}>
          <div className="create-column-btn">+ New Column</div>
        </div> */
}
