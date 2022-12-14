import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../api";
import Navbar from "./navbar";

const { REACT_APP_BASE_URL } = process.env;

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
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState();
  const [hasProfile, setHasProfile] = useState();
  const [image, setImage] = useState();
  const token = localStorage.getItem("token");

  const handleDone = async () => {
    localStorage.setItem("username", username);
    await API.userDetails
      .editUserDetails({
        id,
        username,
        firstname,
        lastname,
        email,
        password,
        confirm_password: confirmPassword,
        token,
      })
      .then(() => {
        toast.success("Edit Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const uploadPicture = async () => {
    const uploadData = new FormData();
    uploadData.append("title", username);
    uploadData.append("picture", image, image.name);
    uploadData.append("username", username);
    if (hasProfile === true) {
      await API.userDetails
        .editUploadProfile({
          id: profile.id,
          body: uploadData,
          token,
        })
        .then((data) => {
          setProfile(data.data);
          setUrl(`${REACT_APP_BASE_URL}${data.data.picture}`);
        });
    } else {
      await API.userDetails
        .uploadProfile({
          body: uploadData,
          token,
        })
        .then((data) => {
          setProfile(data.data);
          setUrl(`${REACT_APP_BASE_URL}${data.data.picture}`);
          setHasProfile(true);
        });
    }
  };

  const fetchData = async () => {
    await API.userDetails
      .getUserDetails({
        username,
        token,
        follower: "none",
        following: "none",
      })
      .then((data) => {
        if (data.data.profile_details === "None") {
          setProfile("None");
          setHasProfile(false);
        } else {
          setUrl(`${REACT_APP_BASE_URL}${data.data.profile_details.picture}`);
          setProfile(data.data.profile_details);
          setHasProfile(true);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
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
      <div className="grid gap-6 mb-6 md:grid-cols-2 p-3">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 p-3 ml-2
            sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Done
      </button>
    </div>
  );
}

export default UpdateUserDetails;
