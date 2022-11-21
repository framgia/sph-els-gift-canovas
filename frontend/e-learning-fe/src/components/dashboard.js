import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import API from "../api";
import Loader from "./loader";
import Navbar from "./navbar";

const { REACT_APP_BASE_URL } = process.env;

function Dashboard() {
  const [profile, setProfile] = useState([]);
  const [hasProfile, setHasProfile] = useState();
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonsLearned, setLessonsLearned] = useState();
  const [wordsLearned, setWordsLearned] = useState();
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
        page: "dashboard",
        token,
      })
      .then((data) => {
        setActivities(data.data);
      });
    await API.results
      .userQuizResults({
        username,
        token,
      })
      .then((data) => {
        setLessonsLearned(data.data.number_of_categories_taken);
        setWordsLearned(data.data.number_of_words_learned);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      <h5 className="p-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Dashboard
      </h5>
      <div className="flex flex-col place-items-center">
        <div
          className="inline-flex overflow-hidden relative justify-center items-center 
                  w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600 \"
        >
          <span className="text-7xl text-gray-600 dark:text-gray-300">
            {hasProfile ? (
              <img className="w-32 h-32 rounded-full" src={profile}></img>
            ) : (
              username[0].toUpperCase()
            )}
          </span>
        </div>
        <p className="mt-3 text-3xl text-center text-gray-900 dark:text-black">
          {username}
        </p>
        <div className="flex flex-row space-x-4">
          <Link to="/words-learned">
            <p className="text-base text-gray-900 dark:text-black underline cursor-pointer ">
              Learned {wordsLearned} Words
            </p>
          </Link>
          <p className="text-base text-gray-900 dark:text-black underline ">
            Learned {lessonsLearned} Lessons
          </p>
        </div>
        <div className="space-y-4 h-4/5 w-3/5 p-4 border-t-4 border-gray-900 mt-5">
          {isLoading ? (
            <div class="text-center">
              <Loader />
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id}>
                {activity.activity_description === "follow" ||
                activity.activity_description === "unfollow" ? (
                  <div className="flex flex-row place-content-between">
                    <div className="flex flex-row space-x-2">
                      <h3 className="tracking-tighter text-blue-800  md:text-lg ">
                        {activity.user}
                      </h3>
                      <p className="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                        {activity.activity_description}
                      </p>
                      <h3 className="tracking-tighter text-blue-800  md:text-lg ">
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
                      <h3 className="tracking-tighter text-blue-800  md:text-lg ">
                        {activity.user}
                      </h3>
                      <p className="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                        learned {activity.quiz.total_check_answers} of{" "}
                        {activity.quiz.total_words} words in
                      </p>
                      <h3 className="tracking-tighter text-blue-800  md:text-lg">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
