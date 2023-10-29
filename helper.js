/*const defaultBoard = {
  title: "Platform Launch",
  "columns 1": "Todo",
  "columns 2": "Doing",
  "columns 3": "Done",
  id: crypto.randomUUID(),
};*/


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
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) {
      const updatedColumnValues = task.columnValues.map((columnValue, columnIndex) => {
        if (columnIndex === index) {
          return {...columnValue, checked: checkedVal}
        }
        return columnValue
      })
      return {...task, columnValues: updatedColumnValues}
    }
    return task
  })
  localStorage.setItem("tasks", JSON.stringify(updatedTasks))

}