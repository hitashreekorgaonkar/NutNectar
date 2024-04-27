import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input2 } from "../components/index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  authService,
  LoggedInUserContext,
  login as authLogin,
} from "../components/index";

const Signup = ({ onSignUp, onSignUpCreate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
        onSignUpCreate(false);
      } else {
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div
        className={`mx-auto w-full max-w-lg bg-gy-100 rounded-xl px-10 py-5 border border-black/10`}
      >
        <div className="flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            {/* <Logo width="100%" /> */}
          </span>
        </div>
        <h2 className="font-sans text-indigo-700 text-3xl font-bold leading-tight my-8">
          Sign Up
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input2
              label="Full Name"
              labelclassname="text-indigo-700"
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input2
              label="Email"
              labelclassname="text-indigo-700"
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input2
              label="Password"
              labelclassname="text-indigo-700"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" bgColor="bg-indigo-700">
              Create Account
            </Button>
          </div>
        </form>
        <p className="my-2 text-base text-black/60">
          Already have an account?&nbsp;
          <button
            onClick={() => {
              onSignUp(false);
            }}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default Signup;
