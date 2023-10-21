//rrd imports
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
//rs imports
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
//r imports
import { createContext, useState } from "react";

export const ThemeContext = createContext();
export const AppContext = createContext();

function MainLayout() {
  //Light / dark Mode
  const [lightMode, setLightMode] = useState(false);
  const [hidesidebarState, setHidesidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarModal, setSidebarModal] = useState(false)
  //Using the media query for responsive layout
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSidebarModal = () => {
    setSidebarModal(true);
  };

  const closeSidebarModal = () => {
    setSidebarModal(false);
  };

  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  function hideSidebar() {
    setHidesidebar(true);
  }


  if (!lightMode) {
    document.body.style.backgroundColor = "rgb(32, 33, 44)";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "#f4f7fd";
    document.body.style.color = "black";
  }

  const style = {
    left: isDesktopOrTablet ? (hidesidebarState ? "0px" : "250px") : "0px",
  };


  return (
    <div className="main-layout" >
      <div className={`main-content`}>
        <AppContext.Provider
          value={{
            lightMode,
            changeTheme,
            hidesidebarState,
            hideSidebar,
            setHidesidebar, 
            isModalOpen,
            openModal,
            closeModal,
            sidebarModal,
            openSidebarModal,
            closeSidebarModal
          }}
        >
          {isDesktopOrTablet && <SideBar />}
          {/*<div className="dashboard-container">*/}
            <NavBar />
            <div className="dashboard-content" style={style}>
              <Outlet />
            </div>
          {/*</div>*/}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default MainLayout;
