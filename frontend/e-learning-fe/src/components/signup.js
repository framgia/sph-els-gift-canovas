import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../api";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDisableSignupButton, setIsDisableSignupButton] = useState(false);

  const handleOnChangeAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const toastWarning = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toastWarning("Password Does Not Match!");
    } else {
      const response = await API.signup.signUp({
        username,
        email,
        firstname,
        lastname,
        password,
        confirmPassword,
        isAdmin,
      });

      if (response.status === 200) {
        toastSuccess("Success!");
        navigate("/", { replace: true });
      } else toastWarning("User Already Exist!");
    }
  };

  const checkFields = () => {
    if (
      username !== "" &&
      email !== "" &&
      firstname !== "" &&
      lastname !== "" &&
      password !== "" &&
      confirmPassword !== ""
    )
      setIsDisableSignupButton(true);
  };

  return (
    <section class="md:h-screen lg:h-screen dark:bg-gray-900 p-8">
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
      <div class="flex flex-col items-center justify-center px-6 py-8">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          E-Learning
        </a>
        <div class="rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 relative justify-center items-center">
          <div class="p-6">
            <div class="flex flex-col space-y-4">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create E-Learning Account
              </h1>
              <div class="flex flex-row md:space-x-32 lg:space-x-40">
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
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
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                    placeholder="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>
              <div class="flex flex-row md:space-x-32 lg:space-x-40">
                <div>
                  <label
                    for="firstname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                    placeholder="firstname"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      checkFields();
                    }}
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>
              <div class="flex flex-row md:space-x-32 lg:space-x-40">
                <div>
                  <label
                    for="lastname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                    placeholder="lastname"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg md:w-48 lg:w-80
                        focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="flex items-start mt-3">
              <div class="flex items-center h-5">
                <input
                  id="is_admin"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                    focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                    dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={isAdmin}
                  onChange={handleOnChangeAdmin}
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="is_admin"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Admin
                </label>
              </div>
            </div>
            <div class="flex flex-col space-y-4 place-items-center">
              {isDisableSignupButton === true ? (
                <button
                  onClick={handleSignUp}
                  type="submit"
                  class="w-80 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              ) : (
                <button
                  disabled
                  type="submit"
                  class="w-80 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none mt-8
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-gray-400 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              )}

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/">
                  <a class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </a>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
