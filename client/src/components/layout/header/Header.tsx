import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.hook";
import "./Header.scss";
import Button from "../../general/button/Button";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../../routes/path";

const Header = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const userRoleLableCreater = () => {
    if (user) {
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ", ";
        }
      });
      return result;
    }
    return "--";
  };
  return (
    <div className="header">
      <div className="header__left">
        <span onClick={() => navigate("/")}>Logo</span>
        <div className="header__title">
          <h1>AuthLoading:{isAuthLoading ? "True" : "..."}</h1>
          <h1 className="header__auth">
            Auth:{" "}
            {isAuthenticated ? (
              <span>Authenticated</span>
            ) : (
              <span>Not Authinticatae</span>
            )}
          </h1>
          <h1 className="header__userName">
            UserName: {user ? user.userName : "..."}
          </h1>

          <h1 className="header__userRole">
            UserRoles : {userRoleLableCreater()}
          </h1>
        </div>
      </div>
      <div className="header__right">
        {isAuthenticated ? (
          <div>
            <Button
              label="Dashboard"
              type="button"
              variant="primary"
              onClick={() => navigate(PATH_DASHBOARD.dashboard)}
            />
            <Button
              label="Logout"
              type="button"
              variant="primary"
              onClick={logout}
            />
          </div>
        ) : (
          <div>
            <Button
              label="Register"
              onClick={() => navigate(PATH_PUBLIC.register)}
              type="button"
              variant="primary"
            />
            <Button
              label="Login"
              onClick={() => navigate(PATH_PUBLIC.login)}
              type="button"
              variant="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
