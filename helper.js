const defaultBoard = {
  title: "Platform Launch",
  "columns 1": "Todo",
  "columns 2": "Doing",
  "columns 3": "Done",
  id: crypto.randomUUID(),
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [defaultBoard] ;
};

export const createNewBoard = (values) => {
  const existingBoards = fetchData("boards") ;
  return localStorage.setItem(
    "boards",
    JSON.stringify([...existingBoards, { ...values, id: crypto.randomUUID() }])
  );
};

export const createTasks = ({ values, boardId }) => {
  const existingTasks = fetchData("tasks");
  //return localStorage.setItem("tasks", JSON.stringify([...existingTasks, {...values, boardId: boardId, id: crypto.randomUUID()}]))
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
  const existingTasks = fetchData("tasks");
  const foundedTasks = existingTasks
    ? existingTasks.filter((task) => task.boardId === boardId)
    : "";
  return foundedTasks;
};

export const updateTask = (taskId, columns, columnValuesAfter) => { //, subtasks
  const existingTasks = fetchData("tasks");
  const updatedTasks = existingTasks.map((task) =>
    task.id === taskId ? { ...task, tasks: columns, columnValues: columnValuesAfter } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};
