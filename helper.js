export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createNewBoard = (values) => {
  const existingBoards = fetchData("boards") ?? [];
  //const boardKeys = Object.keys(values);

  const boardId = crypto.randomUUID()

  localStorage.setItem(
    "boards",
    JSON.stringify([...existingBoards, { ...values, id: boardId }])
  );
  //window.location.href = `/dashboard/${boardId}`;
  
};

export const createTasks = ({ values, boardId }) => {
  const existingTasks = fetchData("tasks") ?? [];
  const columnKeys = Object.keys(values).filter((key) =>
    key.startsWith("column")
  );
  const columnValues = columnKeys?.map((key) => ({
    task: values[key],
    checked: false,
  }));

  return localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...existingTasks,
      { ...values, columnValues, boardId: boardId, id: crypto.randomUUID() },
    ])
  );

  
};

export const getAllMatchingTasks = (boardId) => {
  const existingTasks = fetchData("tasks") || [];
  const foundedTasks = existingTasks
    ? existingTasks.filter((task) => task.boardId === boardId)
    : "";
  return foundedTasks;
};

export const updateTask = (taskId, columns) => {
  const existingTasks = fetchData("tasks");
  const updatedTasks = existingTasks.map((task) =>
    task.id === taskId ? { ...task, tasks: columns } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const updateCheckBox = (taskId, index, checkedVal) => {
  const tasks = fetchData("tasks") ?? [];
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      const updatedColumnValues = task.columnValues.map(
        (columnValue, columnIndex) => {
          if (columnIndex === index) {
            return { ...columnValue, checked: checkedVal };
          }
          return columnValue;
        }
      );
      return { ...task, columnValues: updatedColumnValues };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const updateBoard = (newBoard, oldBoard) => {
  const existingBoards = fetchData("boards");

  const editedBoard = existingBoards.find((board) => board.id === newBoard.id);

  if (editedBoard !== -1) {
    const updatedBoards = [
      ...existingBoards.slice(0, editedBoard),
      newBoard,
      ...existingBoards.slice(0, editedBoard + 1),
    ];
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }

  const oldBoardColumns = oldBoard.split(",");
  const existingTasks = fetchData("tasks");

  existingTasks?.map((task) => {
    if (task.boardId === newBoard.id) {
      oldBoardColumns.map((key, index) => {
        if (key === task.tasks) {
          task.tasks = newBoard[`columns ${index + 1}`];
        }
      });
      localStorage.setItem("tasks", JSON.stringify(existingTasks));
    }
  });


  //if a column got erased, delete the tasks that was in that column, by checking if the tasks prop exists or not
  const updatedTasks = existingTasks.filter((task) => {
    if (!task.tasks) {
      return false;
    }
    return true;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  
};


export const deleteBoard = (boardId) => {
  const boards = fetchData("boards");
  const updatedBoards = boards.filter(board => board.id !== boardId)

  localStorage.setItem("boards", JSON.stringify(updatedBoards));

  //window.location.href = "/";
}
