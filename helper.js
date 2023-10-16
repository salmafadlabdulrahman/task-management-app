//Steps And Notes to myself
//i'm gonna make an array of boards if there's no board then I display a message for the user to create a new one
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}