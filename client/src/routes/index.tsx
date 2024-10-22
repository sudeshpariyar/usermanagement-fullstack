import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/public/home/HomePage";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./path";
import RegisterPage from "../pages/public/register/RegisterPage";
import LoginPage from "../pages/public/login/LoginPage";
import Unauthorized from "../pages/public/unauthorized/Unauthorized";
import AuthGuard from "../auth/AuthGuard";
import Dashboard from "../pages/dashboard/Dashboard";
import SendMessagePage from "../pages/dashboard/message/SendMessagePage";
import Inbox from "../pages/dashboard/inbox/Inbox";
import MyLogs from "../pages/dashboard/logs/MyLogs";
import UserPage from "../pages/dashboard/user/UserPage";
import ManagerPage from "../pages/dashboard/manager/ManagerPage";
import UserManagement from "../pages/dashboard/user/UserManagement";
import UpdateRole from "../pages/dashboard/roles/UpdateRole";
import AllMessage from "../pages/dashboard/message/AllMessage";
import SystemLogsPage from "../pages/dashboard/logs/SystemLogsPage";
import AdminPage from "../pages/dashboard/admin/AdminPage";
import OwnerPage from "../pages/dashboard/owner/OwnerPage";
import NotFound from "../pages/public/notfound/NotFound";
import {
  allAccessRolles,
  managerAccessRoles,
  ownerAccessRoles,
  adminAccessRoles,
} from "../auth/auth.utils";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        //public routes
        <Route index element={<HomePage />} />
        <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
        <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<Unauthorized />} />
        {/* //Protected routes--------- */}
        <Route element={<AuthGuard roles={allAccessRolles} />}>
          <Route path={PATH_DASHBOARD.dashboard} element={<Dashboard />} />
          <Route
            path={PATH_DASHBOARD.sendMessage}
            element={<SendMessagePage />}
          />
          <Route path={PATH_DASHBOARD.inbox} element={<Inbox />} />
          <Route path={PATH_DASHBOARD.myLogs} element={<MyLogs />} />
          <Route path={PATH_DASHBOARD.user} element={<UserPage />} />
        </Route>
        //manager access
        <Route element={<AuthGuard roles={managerAccessRoles} />}>
          <Route path={PATH_DASHBOARD.manager} element={<ManagerPage />} />
        </Route>
        //Administrator access
        <Route element={<AuthGuard roles={adminAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.userManagement}
            element={<UserManagement />}
          />
          <Route path={PATH_DASHBOARD.updateRole} element={<UpdateRole />} />
          <Route path={PATH_DASHBOARD.allMessage} element={<AllMessage />} />
          <Route path={PATH_DASHBOARD.systemLog} element={<SystemLogsPage />} />
          <Route path={PATH_DASHBOARD.admin} element={<AdminPage />} />
        </Route>
        //owner access
        <Route element={<AuthGuard roles={ownerAccessRoles} />}>
          <Route path={PATH_DASHBOARD.owner} element={<OwnerPage />} />
        </Route>
        {/* //Protected routes---------  */}
        //NotFound
        <Route path={PATH_PUBLIC.notfound} element={<NotFound />} />
        <Route path="*" element={<Navigate to={PATH_PUBLIC.notfound} />} />
      </Route>
    </Routes>
  );
};

export default GlobalRouter;
