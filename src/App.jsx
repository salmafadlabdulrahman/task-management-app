import "./App.css";
import DashBoard /*dashboardLoader*/ from "./Pages/DashBoard";
import MainLayout from "./Pages/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
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
    </>
  );
}

export default App;
