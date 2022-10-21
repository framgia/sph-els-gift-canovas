import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "./navbar";

function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [status, setStatus] = useState("");
  const [extraUsernameState, setExtraUsernameState] = useState("");

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const extraUsername = localStorage.getItem("extraUsername");

  const fetchData = async () => {
    if (extraUsername !== "") {
      await API.userDetails
        .getUserDetails({
          username: extraUsername,
          token,
          follower: username,
          following: extraUsername,
        })
        .then((data) => {
          setStatus(data.data.status);
          setUserDetails(data.data.data);
          setIsLoading(false);
          setFlag(true);
        });
    } else {
      await API.userDetails
        .getUserDetails({
          username,
          token,
          follower: "none",
          following: "none",
        })
        .then((data) => {
          setUserDetails(data.data);
          setIsLoading(false);
        });
    }

    localStorage.setItem("extraUsername", "");
  };

  const handleFollow = async () => {
    await API.follow
      .follow({
        token,
        follower_username: username,
        following_username: extraUsernameState,
      })
      .then((data) => {
        setStatus("unfollow");
      });
  };

  useEffect(() => {
    setExtraUsernameState(extraUsername);
    fetchData();
  }, []);

  return (
    <div class="p-6">
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <div class="flex flex-row space-x-4 p-10">
          <div class="flex flex-col space-y-4 ">
            <div
              class="inline-flex overflow-hidden relative justify-center items-center 
            w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600 ml-10"
            >
              <svg
                class="absolute -left-1 w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </div>

            <p class="tracking-tighter text-center text-black md:text-lg dark:text-black">
              {userDetails.username}
            </p>
            <p class="tracking-tighter text-center text-black md:text-lg dark:text-black">
              {userDetails.firstname} &nbsp; {userDetails.lastname}
            </p>
            <p class="tracking-tighter text-center text-black md:text-lg dark:text-black">
              {userDetails.email}
            </p>
            <Link to="/update" state={{ data: userDetails }}>
              <button
                type="button"
                class=" mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Edit
              </button>
            </Link>
            {flag === false ? (
              ""
            ) : (
              <button
                type="button"
                class=" mt-5 text-white bg-blue-700 hover:bg-white-800 
                  focus:outline-none focus:ring-4 focus:ring-blue-300 
                  font-medium rounded-full text-sm px-5 py-2.5 text-center 
                  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleFollow}
              >
                {status}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
