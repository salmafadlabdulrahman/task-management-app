
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createNewBoard = (values) => {
  const existingBoards = fetchData("boards") ?? [];
  return localStorage.setItem(
    "boards",
    JSON.stringify([...existingBoards, { ...values, id: crypto.randomUUID() }])
  );
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

  //update the tasks value within the task object
  const oldBoardColumns = oldBoard.split(",")
  console.log(oldBoardColumns)
  const existingTasks = fetchData("tasks");
  const editedTasks = existingTasks.find(
    (task) => task.boardId === newBoard.id
  );

  if (editedTasks !== -1) {
    oldBoardColumns.map((item) => {
      if (item === editedTasks.tasks) {
        const updatedTasks = [
          { ...editedTasks, tasks: item }
        ];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    });
  }
  console.log(editedTasks);
};