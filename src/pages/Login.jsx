import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
import { Button, Input2 } from "../components/index";
// import { useDispatch } from "react-redux";
// import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = ({ isDialogOpen, onClose }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

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
                      onClick={onClose}
                      type="button"
                      className="rounded-full bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                      <p className="text-red-600 mt-8 text-center">{error}</p>
                    )}
                    <div className="space-y-5">
                      <Input2
                        label="Username"
                        labelClassName="text-indigo-700"
                        placeholder="Username"
                      />
                      <Input2
                        label="Password"
                        labelClassName="text-indigo-700"
                        placeholder="Password"
                        type="password"
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        bgColor="bg-indigo-700"
                      >
                        Login
                      </Button>
                    </div>
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
