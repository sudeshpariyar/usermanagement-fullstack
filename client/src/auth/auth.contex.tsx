import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.types";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
} from "../utils/globalConfig";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "./auth.utils";
import { toast } from "react-toastify";

const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: undefined,
    };
  }
  return state;
};

const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

//Auth context
export const AuthContext = createContext<IAuthContext | null>(null);

//Interface of the auth context
interface IProps {
  children: ReactNode;
}

//Component to manage all auth contexts
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      //validate token
      if (token) {
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  //iniitalize authentication sataus when application loads
  useEffect(() => {
    console.log(`Authentication Context initilization start`);
    initializeAuthContext()
      .then(() => console.log(`Initial context for auth completed.`))
      .catch((err) => console.log(err));
  }, []);

  const register = useCallback(
    async (
      firstName: string,
      LastName: string,
      userName: string,
      password: string,
      address: string,
      email: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        LastName,
        email,
        password,
        address,
        userName,
      });
      console.log("Register Result:", response);
      toast.success("Register Success.");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );
  const login = useCallback(async (userName: string, password: string) => {
    const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success("Login Success");
    const { newToken, userInfo } = response.data;
    setSession(newToken);
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userInfo,
    });
    navigate(PATH_AFTER_LOGIN);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: IAuthContextActionTypes.LOGOUT });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  //Object for the value of the auth context provider
  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
