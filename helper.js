//Steps And Notes to myself
//i'm gonna make an array of boards if there's no board then I display a message for the user to create a new one
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

/*export const createNewBoard = () => {
    //first I need to check if there's already a boards array in the local storage
    //if there's then I grab that array, destructure it, and add the newly created board to it
    //if there's not then I create a new boards array with my new board as the first element
    const existingBoards = fetchData("boards");
    return existingBoards 

}*/