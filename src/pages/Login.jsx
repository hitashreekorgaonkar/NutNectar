import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
import { Button, Input2 } from "../components/index";
import { useDispatch } from "react-redux";
// import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoggedInUserContext from "../context/loggedInUser/LoggedInUserContext";

const Login = ({ isDialogOpen, onClose }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const { setLoggedUser } = useContext(LoggedInUserContext);

  const onClose2 = () => {
    reset({});
  };

  const login = async (data) => {
    setError("");
    try {
      const response = await axios.post("/api/v1/users/login", {
        username: data.username,
        password: data.password,
      });
      if (response.data.statusCode === 200) {
        onClose();
        navigate("/");
        localStorage.setItem("auth", response.data.data.accessToken);
        var authValue = localStorage.getItem("auth");
        setLoggedUser(authValue);
        reset({});
      }
    } catch (error) {
      console.log("error", error);
      setLoginError(error?.response.data?.message);
      setError(error.message);
    }
  };

  return (
    <>
      {isDialogOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <div className="relative transform rounded-lg backdrop-opacity-10 backdrop-invert bg-white/30 p-5 text-left shadow-xl transition-all sm:w-full sm:max-w-lg ">
                <div className="bg-white rounded-lg">
                  <div className="absolute -right-3 -top-3">
                    <button
                      onClick={() => {
                        onClose();
                        onClose2();
                      }}
                      type="button"
                      className="rounded-full bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>{" "}
                  <div
                    className={`mx-auto w-full max-w-lg bg-gy-100 rounded-xl px-10 py-5 border border-black/10`}
                  >
                    <div className="flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                      </span>
                    </div>
                    <h2 className="font-sans text-indigo-700 text-3xl font-bold leading-tight my-8">
                      Login
                    </h2>

                    {error && (
                      <p className="text-red-600 mt-8 text-center">
                        {loginError}
                      </p>
                    )}
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                      <div className="space-y-5">
                        <Input2
                          label="Username"
                          labelclassname="text-indigo-700"
                          placeholder="Username"
                          {...register("username", { required: true })}
                        />
                        <Input2
                          label="Password"
                          labelclassname="text-indigo-700"
                          placeholder="Password"
                          type="password"
                          {...register("password", { required: true })}
                        />
                        <Button
                          type="submit"
                          className="w-full"
                          bgColor="bg-indigo-700"
                        >
                          Login
                        </Button>
                      </div>
                    </form>
                    <p className="my-2 text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
