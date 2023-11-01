export const fetchData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (err) {
    throw new Error(err);
  }
};

export const createNewBoard = (values) => {
  const existingBoards = fetchData("boards") ?? [];

  localStorage.setItem(
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
  const existingTasks = fetchData("tasks") ?? [];
  const foundedTasks = existingTasks
    ? existingTasks.filter((task) => task.boardId === boardId)
    : [];
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

  if (editedBoard) {
    const updatedBoards = [
      ...existingBoards.slice(0, editedBoard),
      newBoard,
      ...existingBoards.slice(0, editedBoard + 1),
    ];

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }

  const oldBoardColumns = oldBoard.split(",");
  const existingTasks = fetchData("tasks") ?? [];

  existingTasks.forEach((task) => {
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
    return task.tasks;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  return true;
};

export const editTask = (taskId, values, boardId) => {
  const existingTasks = fetchData("tasks") || [];
  const updatedTask = existingTasks.findIndex((task) => task.id === taskId);

  const columnKeys = Object.keys(values).filter((key) =>
    key.startsWith("column")
  );
  const columnValues = columnKeys?.map((key) => ({
    task: values[key],
    checked: false,
  }));

  if (updatedTask !== -1) {
    const updatedTasks = [
      ...existingTasks.slice(0, updatedTask),
      { ...values, columnValues, boardId: boardId, id: taskId },

      ...existingTasks.slice(updatedTask + 1),
    ];

    return localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
};

export const deleteBoard = (boardId) => {
  const boards = fetchData("boards") || [];
  const updatedBoards = boards.filter((board) => board.id !== boardId);

  localStorage.setItem("boards", JSON.stringify(updatedBoards));

  window.location.href = "/";
};

export const deleteTask = (taskId) => {
  const tasks = fetchData("tasks") || [];
  const updateTasks = tasks.filter((task) => task.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(updateTasks));
};
