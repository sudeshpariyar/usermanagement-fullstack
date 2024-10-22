import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  console.log("Pathname: " + pathname);
  const renderSidebar = () => {
    if (
      isAuthenticated &&
      pathname.toLocaleLowerCase().startsWith("/dashboard")
    ) {
      return <Sidebar />;
    }
    return null;
  };
  return (
    <div>
      <Header />

      <div className="layout__outlet">
        {renderSidebar()}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
