import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.hook";
import { PATH_DASHBOARD } from "../../../routes/path";
import Button from "../../general/button/Button";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRoute = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(url);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__items">
        <div className="user">
          {user?.firstName}
          {user?.lastNaeName}
        </div>
        <Button
          label="User Management"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.userManagement)}
        />
        <Button
          label="Send Message"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.sendMessage)}
        />
        <Button
          label="Inbox"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.inbox)}
        />
        <Button
          label="All Message"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.allMessage)}
        />
        <Button
          label="All Logs"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.systemLog)}
        />
        <Button
          label="My Logs"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.myLogs)}
        />
        <hr />
        <Button
          label="Owner Page"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.owner)}
        />
        <Button
          label="Admin Page"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.admin)}
        />
        <Button
          label="Manager Page"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.manager)}
        />
        <Button
          label="User Page"
          type="button"
          variant="primary"
          onClick={() => handleRoute(PATH_DASHBOARD.user)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
