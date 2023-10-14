//rrd imports
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
//rs imports
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";

function MainLayout() {
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 767px)" });

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="sidebar">{isDesktopOrTablet && <SideBar />}</div>
        <div className="dashboard-container">
          {/*<div className="header">*/}
            <NavBar />
          {/*</div>*/}
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
