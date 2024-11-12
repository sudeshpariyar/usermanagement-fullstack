import { useState } from "react";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth.hook";
import { ILoginDto } from "../../../types/auth.types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import InputField from "../../../components/general/inputField/InputField";
import { PATH_PUBLIC } from "../../../routes/path";
import { Link } from "react-router-dom";
import Button from "../../../components/general/button/Button";
import "./LoginPage.scss";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: { userName: "", password: "" },
  });

  const onSubmitLogin = async (data: ILoginDto) => {
    console.log("This is data", data);
    try {
      setLoading(true);
      await login(data.userName, data.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 401) {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("Error. Please contact the administrator ...");
      }
    }
  };

  return (
    <div className="loginPage">
      <form className="loginPage__form" onSubmit={handleSubmit(onSubmitLogin)}>
        <h1>Login</h1>
        <InputField
          label="User Name"
          {...register("userName")}
          error={errors.userName?.message}
        />
        <InputField
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <div className="loginPage__link">
          <div>Don't have an account?</div>
          <Link to={PATH_PUBLIC.register}>Register</Link>
        </div>
        <div className="loginPage__buttons">
          <Button
            variant="primary"
            type="button"
            label="Reset"
            onClick={() => reset()}
          />
          <Button
            variant="primary"
            type="submit"
            label="Login"
            onClick={() => {}}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
