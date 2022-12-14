import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./navbar";
const { REACT_APP_BASE_URL } = process.env;

function UserDetails() {
  const [profile, setProfile] = useState([]);
  const [hasProfile, setHasProfile] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [extraUsernameState, setExtraUsernameState] = useState("");

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const extraUsername = localStorage.getItem("extraUsername");

  const fetchData = async () => {
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
        if (data.data.profile_details === "None") {
          setProfile("None");
          setHasProfile(false);
        } else {
          setProfile(
            `${REACT_APP_BASE_URL}${data.data.profile_details.picture}`
          );
          setHasProfile(true);
        }
        setIsLoading(false);
      });

    localStorage.setItem("extraUsername", "");
  };

  const handleFollow = async () => {
    if (status === "follow") {
      await API.follow
        .follow({
          token,
          follower_username: username,
          following_username: extraUsernameState,
        })
        .then((data) => {
          setStatus("unfollow");
        });
    } else {
      await API.follow
        .unfollow({
          token,
          follower_username: username,
          following_username: extraUsernameState,
        })
        .then((data) => {
          setStatus("follow");
        });
    }
  };

  useEffect(() => {
    setExtraUsernameState(extraUsername);
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <div className="flex flex-col place-items-center mt-20">
          <div
            className="inline-flex overflow-hidden relative justify-center items-center 
                w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <span className="text-7xl text-gray-600 dark:text-gray-300">
              {hasProfile ? (
                <img className="w-32 h-32 rounded-full" src={profile}></img>
              ) : (
                userDetails.username[0].toUpperCase()
              )}
            </span>
          </div>
          <p className="tracking-tighter text-center text-black md:text-lg dark:text-black">
            {userDetails.username}
          </p>
          <p className="tracking-tighter text-center text-black md:text-lg dark:text-black">
            {userDetails.firstname} {userDetails.lastname}
          </p>
          <p className="tracking-tighter text-center text-black md:text-lg dark:text-black mb-5">
            {userDetails.email}
          </p>
          {status === "follow" ? (
            <button
              type="button"
              onClick={handleFollow}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 
              dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              {status}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFollow}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br
               focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg 
               shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm 
               px-5 py-2.5 text-center mr-2 mb-2"
            >
              {status}
            </button>
          )}
          <div className="space-y-4 h-4/5 w-3/5 p-4 border-t-4 border-gray-900 mt-5"></div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
