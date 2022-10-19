import React, { useEffect, useState } from "react";
import API from "../api";

function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.userDetails
      .getUserDetails({
        username,
        token,
      })
      .then((data) => {
        setUserDetails(data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        ""
      ) : (
        <div class="flex flex-row space-x-4 p-10">
          <div class="flex flex-col space-y-4 ">
            <div
              class="inline-flex overflow-hidden relative justify-center items-center 
            w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600"
            >
              <span class="text-7xl text-gray-600 dark:text-gray-300">
                {username[0].toUpperCase()}
              </span>
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
            <button
              type="button"
              class=" mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Edit
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
