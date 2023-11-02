import "./App.css";
import Board from "./Pages/Board";
import DashBoard, { dashboardAction } from "./Pages/DashBoard";
import MainLayout, { mainLoader } from "./Pages/MainLayout";
import Error from "./Pages/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import NotFoundPage from "./components/NotFoundPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <DashBoard />, 
        action: dashboardAction,
        children: [
          {
            path: "/dashboard/:id",
            element: <Board />,
          }
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
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
