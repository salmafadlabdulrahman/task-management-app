//rrd imports
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
//rs imports
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
//r imports
import { createContext, useState } from "react";

export const ThemeContext = createContext();

function MainLayout() {
  //Light / dark Mode
  const [lightMode, setLightMode] = useState(true);
  

  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  const lightTheme = {
    backgroundColor: lightMode && "white",
    border: !lightMode && "1px solid #3e3f4e",
  };

  //Using the media query for responsive layout
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="sidebar" style={lightTheme}>
          {isDesktopOrTablet && (
            <SideBar theme={lightMode} changeTheme={changeTheme} />
          )}
        </div>
        <div className="dashboard-container">
          <NavBar theme={lightMode} />
          <div className="dashboard-content">
            <ThemeContext.Provider value={{lightMode, setLightMode}}>
              <Outlet  />
            </ThemeContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
