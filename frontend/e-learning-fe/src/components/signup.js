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
  const [isDisableSignupButton, setisDisableSignupButton] = useState(false);

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
      setisDisableSignupButton(true);
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
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div class="w-3/4 h-4/5  bg-white rounded-lg shadow dark:border dark:bg-gray-300 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create E-Learning Account
            </h1>
            <div class="space-y-44 md:space-y-6">
              <div class="flex flex-row space-x-44">
                <div class="w-96">
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
                    class="bg-red-50 border border-red-200 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
                <div class="w-96">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>

              <div class="flex flex-row space-x-44">
                <div class="w-96">
                  <label
                    for="firstname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="firstname"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
                <div class="w-96">
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
                    class="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                      w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>

              <div class="flex flex-row space-x-44">
                <div class="w-96">
                  <label
                    for="lastname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="lastname"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
                <div class="w-96">
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                      w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      checkFields();
                    }}
                  />
                </div>
              </div>

              <div class="flex items-start">
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
                    class="font-light text-black dark:text-black"
                  >
                    Admin
                  </label>
                </div>
              </div>
              {isDisableSignupButton === true ? (
                <button
                  type="submit"
                  class="w-96 text-black bg-primary-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium ml-72
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-green-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSignUp}
                >
                  Create Account
                </button>
              ) : (
                <button
                  type="submit"
                  class="w-96 text-black bg-primary-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium ml-72
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-gray-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled
                >
                  Create Account
                </button>
              )}
              <p class="text-sm font-light text-black dark:text-black">
                Already have an account?{" "}
                <Link to="/">
                  <a class="font-medium text-black hover:underline dark:text-black">
                    Login here
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

export default SignUp;
