import { PATH_PUBLIC, PATH_DASHBOARD } from "../routes/path";

//URLS
export const SERVER_API_KEY = "https://localhost:7223/api";

export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "/Auth/login";
export const UPDATE_ROLE_URL = "/Auth/update-role";
export const ME_URL = "Auth/me";
export const USERS_LIST_URL = "/Auth/users";
export const USERNAME_LIST_URL = "/Auth/username";

export const ALL_MESSAGE_URL = "/Message";
export const CREATE_MESSAGE_URL = "/Message/create";
export const MY_MESSAGE_URL = "Message/own";

export const LOGS_URL = "/Log";
export const MY_LOGS_URL = "/Log/own";

//Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
