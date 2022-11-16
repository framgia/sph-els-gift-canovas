import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import API from "../api";
import Loader from "./loader";
import Navbar from "./navbar";

const { REACT_APP_BASE_URL } = process.env;

function UserDetails() {
  const [activities, setActivities] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [profile, setProfile] = useState();
  const [hasProfile, setHasProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.userDetails
      .getUserDetails({
        username,
        token,
        follower: "none",
        following: "none",
      })
      .then((data) => {
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
      });
    await API.userActivityLog
      .dashboardUserActivity({
        username,
        page: "profile",
        token,
      })
      .then((data) => {
        setActivities(data.data);
      });
    await API.follow
      .getNumberOfFollowersFollowing({
        username,
        token,
      })
      .then((data) => {
        setNumberOfFollowers(data.data.followers);
        setNumberOfFollowing(data.data.following);
        setIsLoading(false);
      });

    localStorage.setItem("extraUsername", "");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      {isLoading ? (
        <div className="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col place-items-center p-3">
          <div className="place-self-end">
            <Link to="/update" state={{ data: userDetails }}>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-white-800 
                  focus:outline-none focus:ring-4 focus:ring-green-300 
                  font-medium rounded-full text-sm px-8 py-2.5 text-center 
                  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Edit
              </button>
            </Link>
          </div>
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
            {userDetails.firstname} &nbsp; {userDetails.lastname}
          </p>

          <div className="flex flex-row">
            <div className="flex flex-col mr-3">
              <span className="font-bold text-2xl text-center">
                {numberOfFollowers}
              </span>
              <span className="text-sm text-black">Followers</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl text-center">
                {numberOfFollowing}
              </span>
              <span className="text-sm text-black">Followings</span>
            </div>
          </div>

          <div className="space-y-4 h-4/5 w-3/5 p-4 border-t-4 border-gray-900 mt-5">
            {activities.map((activity) => (
              <div key={activity.id}>
                {activity.activity_description === "follow" ||
                activity.activity_description === "unfollow" ? (
                  <div className="flex flex-row place-content-between">
                    <div className="flex flex-row space-x-2">
                      <h3 className="tracking-tighter text-blue-800 md:text-lg">
                        {activity.user}
                      </h3>
                      <p className="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                        {activity.activity_description}
                      </p>
                      <h3 className="tracking-tighter text-blue-800 md:text-lg">
                        {activity.follow}
                      </h3>
                    </div>
                    <ReactTimeAgo
                      date={new Date(activity.created_at)}
                      locale="en-US"
                    />
                  </div>
                ) : (
                  <div className="flex flex-row place-content-between">
                    <div className="flex flex-row space-x-2">
                      <h3 className="tracking-tighter text-blue-800 md:text-lg">
                        {activity.user}
                      </h3>
                      <p className="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                        learned {activity.quiz.total_check_answers} of{" "}
                        {activity.quiz.total_words} words in
                      </p>
                      <h3 className="tracking-tighter text-blue-800 md:text-lg">
                        {activity.quiz.category_name}
                      </h3>
                    </div>
                    <ReactTimeAgo
                      date={new Date(activity.created_at)}
                      locale="en-US"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
