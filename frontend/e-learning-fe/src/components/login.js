import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../api";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisable, setisDisable] = useState(false);

  const handleLogin = async () => {
    const response = await API.login.login({
      username,
      password,
    });
    if (response.data.message === "Success") {
      navigate("/dashboard", { replace: true });
    } else {
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
    if (username !== "" && password !== "") setisDisable(true);
  };

  return (
    <section>
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
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-300 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Sign in to your E-Learning Account
            </h1>
            <div class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 
                          sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 
                          dark:focus:border-blue-500"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    checkFields();
                  }}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border 
                          border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                          block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black 
                          dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkFields();
                  }}
                />
              </div>

              {isDisable === true ? (
                <button
                  type="submit"
                  class="w-96 text-black bg-primary-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-green-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleLogin}
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  class="w-96 text-black bg-primary-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-gray-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleLogin}
                  disabled
                >
                  Login
                </button>
              )}
              <p class="text-sm font-light text-black dark:text-black">
                Don’t have an account yet?{" "}
                <Link to="/signup">
                  <a class="font-medium text-black hover:underline dark:text-black">
                    Sign up
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
