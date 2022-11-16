import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import API from "../api";
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
            <div className="text-center">
              <svg
                className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
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
