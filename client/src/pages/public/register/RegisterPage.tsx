import { useState } from "react";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth.hook";
import { useForm } from "react-hook-form";
import { IRegisterDto } from "../../../types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "../../../routes/path";
import Button from "../../../components/general/button/Button";
import InputField from "../../../components/general/inputField/InputField";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userRegister } = useAuth();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    userName: Yup.string().required("User Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("user@example.com"),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters."),
    address: Yup.string().required("Address is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const onSubmitRegistration = async (data: IRegisterDto) => {
    console.log("This is data", data);
    try {
      setLoading(true);
      await userRegister(
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.password,
        data.address
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data } = err;
      if (status === 400 || status === 409) {
        toast.error(data);
      } else {
        toast.error("Error. Please contact the administrator ...");
      }
    }
  };
  return (
    <div className="registerPage">
      <form
        className="registerPage__form"
        onSubmit={handleSubmit(onSubmitRegistration)}
      >
        <h1>Regestration</h1>
        <InputField
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <InputField
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <InputField
          label="User Name"
          {...register("userName")}
          error={errors.userName?.message}
        />
        <InputField
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputField
          label="Address"
          {...register("address")}
          error={errors.address?.message}
        />
        <div className="registerPage__link">
          <div>Already have an account?</div>
          <Link to={PATH_PUBLIC.login}>Log in</Link>
        </div>
        <div className="registerPage__buttons">
          <Button
            variant="primary"
            type="button"
            label="Reset"
            onClick={() => reset()}
          />
          <Button
            variant="primary"
            type="submit"
            label="Register"
            onClick={() => {}}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
