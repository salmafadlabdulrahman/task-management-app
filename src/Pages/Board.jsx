import { useContext } from "react";
import { AppContext } from "./MainLayout";

function Board({ board }) {
    const {lightMode} = useContext(AppContext)
  const allColumns = [];
  const boardKeys = Object.keys(board);
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push(board[key]);
    }
  });

  const style = {
    backgroundColor: lightMode ? "white" : "#2b2c37", //rgb(238, 239, 255)
    color: lightMode ? "black" : "white",
  };

  return (
    <>
      <div className="tasks-table-container">
        {allColumns.map((column, index) => (
            <div className="task-column" key={index}>
            <h3 className="column-title">
              <span
                className="circle"
                style={{
                  backgroundColor: index % 2 === 0 ? "#49c4e5" : "#635fc7",
                }}
              ></span>
              {column} (4)
            </h3>

            {/*<div className={`task-card`} style={style}>
              <h3 className="task-title">{board?.title}</h3>
              <h5 className="task-count">1 of 3 subtasks</h5>
            </div>*/}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
