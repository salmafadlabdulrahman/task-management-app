import "./App.css";
import DashBoard, { dashboardAction, dashboardLoader } from "./Pages/DashBoard";
import MainLayout from "./Pages/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
/*import 'react-toastify/dist/ReactToastify.css';*/


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction
      },
      {
        path: "/about",
        element: <h1>This is the about page</h1>,
      },
      {
        path: "/contact",
        element: <h1>This is the contact page</h1>,
      },
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
