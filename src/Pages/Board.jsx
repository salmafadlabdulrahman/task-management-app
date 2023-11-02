import { useContext, useState } from "react";
import { AppContext } from "./MainLayout";
import { getAllMatchingTasks } from "../../helper";
import { useParams } from "react-router-dom";
import EditBoard from "../components/EditBoard";
import TaskCard from "../components/TaskCard";


function Board({ currentBoard }) {
  const { lightMode } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editBoard, setEditBoard] = useState(false);
  const params = useParams();

  const tasks = getAllMatchingTasks(params.id);


  const allColumns = [];
  const boardKeys = Object.keys(currentBoard ?? []);
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push({ name: currentBoard[key], id: crypto.randomUUID() });
    }
  });

  const style = {
    backgroundColor: lightMode ? "white" : "#2b2c37",
    color: lightMode ? "black" : "white",
  };

  return (
    <>
      {selectedTask && (
        <TaskCard
          task={selectedTask}
          setSelectedTask={setSelectedTask}
          allColumns={allColumns}
        />
      )}
      {allColumns.map((column, index) => (
        <div className="task-column" key={index}>
          <h3 className="column-title">
            <span
              className="circle"
              style={{
                backgroundColor: index % 2 === 0 ? "#49c4e5" : "#635fc7",
              }}
            ></span>
            {column.name} ({
              tasks.map(task => task.tasks).reduce((acc, cur) => cur === column.name ? acc + 1 : acc, 0 )
            })
          </h3>

          {tasks &&
            tasks.length > 0 &&
            tasks.map((task, index) =>
              column.name === task.tasks ? (
                <div
                  className={`task-card`}
                  style={style}
                  key={index}
                  onClick={() => {
                    setSelectedTask(task);
                  }}
                >
                  <h3 className="task-title">{task.taskName}</h3>
                  <h5 className="task-count">
                    {task.columnValues.reduce(
                      (acc, cur) => (cur.checked ? acc + 1 : acc),
                      0
                    )}{" "}
                    of {task.columnValues.length} subtasks
                  </h5>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      ))}
      <div className={`create-new-column ${!lightMode && "darkMode"}`} onClick={() => setEditBoard(true)}>
        <div className="create-column-btn">+ New Column</div>
      </div>

      {editBoard && <EditBoard setEditBoard={setEditBoard} editBoard={editBoard} boardInfo={currentBoard} allColumns={allColumns} />}
    </>
  );
}

export default Board;