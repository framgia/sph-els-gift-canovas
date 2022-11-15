import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../api";
import Loader from "./loader";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisableSignInButton, setIsDisableSignInButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setIsDisableSignInButton(true);
    const response = await API.login.login({
      username,
      password,
    });

    if (response.data.message === "Success") {
      setIsLoading(false);
      localStorage.setItem("username", username);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("extraUsername", "");
      localStorage.setItem("isAdmin", false);
      if (response.data.is_admin === true) {
        localStorage.setItem("isAdmin", true);
        navigate("/admin-dashboard", { replace: true });
      } else navigate("/dashboard", { replace: true });
    } else {
      setIsLoading(false);
      setIsDisableSignInButton(false);
      toast.error("Check Credentials!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const checkFields = () => {
    if (username !== "" && password !== "") setIsDisableSignInButton(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin === "true") navigate("/admin-dashboard", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {isLoading ? <Loader /> : ""}
        <p class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mt-5">
          E-Learning
        </p>
        <div class="w-96 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                      dark:focus:border-blue-500"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  checkFields();
                }}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                      dark:focus:border-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkFields();
                }}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              class={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                isDisableSignInButton ? "dark:bg-gray-600" : "dark:bg-blue-600"
              }`}
              onClick={handleLogin}
              disabled={isDisableSignInButton}
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <Link to="/signup">
                <p class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
