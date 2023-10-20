export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const createNewBoard = (values) => {
    const existingBoards = fetchData("boards") || [];
    return localStorage.setItem("boards", JSON.stringify([...existingBoards, {...values}]))
}