import "./App.css";
import Board from "./Pages/Board";
import DashBoard, { dashboardAction } from "./Pages/DashBoard";
import MainLayout, { mainAction, mainLoader } from "./Pages/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    action: mainAction,
    children: [
      {
        path: "/dashboard/:id",
        element: <DashBoard />, 
        action: dashboardAction
      },
      /*{
        path: "/dashboard/:id",
        element: <Board />,
      }*/
      
    ],
  },
]);

function App() {  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;


/*{
        path: "/about",
        element: <h1>This is the about page</h1>,
      },
      {
        path: "/contact",
        element: <h1>This is the contact page</h1>,
      }, */