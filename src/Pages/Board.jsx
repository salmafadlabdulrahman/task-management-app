import { useContext, useEffect, useState } from "react";
import { AppContext } from "./MainLayout";
import { getAllMatchingTasks } from "../../helper";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function Board({ board }) {
  const { lightMode } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasksNum, setTasksNum] = useState();
  const params = useParams();
  const allColumns = [];
  const boardKeys = Object.keys(board ? board : []);
  boardKeys.forEach((key) => {
    if (key.startsWith("column")) {
      allColumns.push(board[key]);
    }
  });

  const style = {
    backgroundColor: lightMode ? "white" : "#2b2c37",
    color: lightMode ? "black" : "white",
  };

  const tasks = getAllMatchingTasks(params.id);
  console.log(tasks);

  useEffect(() => {
    const divElement = document.querySelector(".task-column");
    const elementsWithClassName = divElement.querySelectorAll("task-card");
    const count = elementsWithClassName.length;
    setTasksNum(count)
  }, []);
  

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
            {column} ({tasksNum})
          </h3>

          {tasks.map((task, index) =>
            column === task.tasks ? (
              <div
                className={`task-card`}
                style={style}
                key={index}
                onClick={() => {
                  setSelectedTask(task);
                }}
              >
                <h3 className="task-title">{task.taskName}</h3>
                <h5 className="task-count">1 of 3 subtasks</h5>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      ))}
      <div className={`create-new-column ${!lightMode && "darkMode"}`}>
        <div className="create-column-btn">+ New Column</div>
      </div>
    </>
  );
}

export default Board;
