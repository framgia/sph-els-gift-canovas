import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import API from "../api";
import Navbar from "./navbar";

function UpdateUserDetails() {
  const location = useLocation();
  const { data } = location.state;
  const {
    id,
    username: propUsername,
    firstname: propFirstname,
    lastname: propLastname,
    email: propEmail,
    password: propPassword,
    confirm_password: propConfirmPassword,
  } = data;
  const [username, setUsername] = useState(propUsername);
  const [firstname, setFirstname] = useState(propFirstname);
  const [lastname, setLastname] = useState(propLastname);
  const [email, setEmail] = useState(propEmail);
  const [password, setPassword] = useState(propPassword);
  const [confirmPassword, setConfirmPassword] = useState(propConfirmPassword);

  const token = localStorage.getItem("token");

  const handleDone = async () => {
    localStorage.setItem("username", username);
    await API.userDetails.editUserDetails({
      id,
      username,
      firstname,
      lastname,
      email,
      password,
      confirm_password: confirmPassword,
      token,
    });
  };

  return (
    <div class="p-6">
      <Navbar />
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="last_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>

      <button
        onClick={handleDone}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full 
            sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Done
      </button>
    </div>
  );
}

export default UpdateUserDetails;
