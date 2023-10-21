const defaultBoard = {
  title: "Platform Launch",
  "columns 1": "dishes",
  "columns 2": "laundry",
  id: crypto.randomUUID()
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [defaultBoard];
};

export const createNewBoard = (values) => {
  const existingBoards = fetchData("boards");
  return localStorage.setItem(
    "boards",
    JSON.stringify([...existingBoards, { ...values, id: crypto.randomUUID() }])
  );
};
