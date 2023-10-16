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
  const [lightMode, setLightMode] = useState(false);
  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  //Using the media query for responsive layout
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  if (!lightMode) {
    document.body.style.backgroundColor = "rgb(32, 33, 44)";
    document.body.style.color = "white"
  } else {
    document.body.style.backgroundColor = "#f4f7fd";
    document.body.style.color = "black"
  }

  return (
    <div className="main-layout">
      <div className="main-content">
        {/*<div className="sidebar" style={lightTheme}>*/}
          {isDesktopOrTablet && (
            <SideBar theme={lightMode} changeTheme={changeTheme} />
          )}
        {/*</div>*/}
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
