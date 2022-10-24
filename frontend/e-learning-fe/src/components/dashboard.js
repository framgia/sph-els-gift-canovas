import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import API from "../api";
import Navbar from "./navbar";

function Dashboard() {
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonsLearned, setLessonsLearned] = useState();
  const [wordsLearned, seWordsLearned] = useState();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    await API.userActivityLog
      .dashboardUserActivity({
        username,
        page: "dashboard",
        token,
      })
      .then((data) => {
        setActivities(data.data);
      });
    await API.userActivityLog
      .userDashboard({
        username,
        token,
      })
      .then((data) => {
        setLessonsLearned(data.data.number_of_categories_taken);
        seWordsLearned(data.data.number_of_words_learned);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6">
      <Navbar />
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Dashboard
      </h5>
      <div class="flex flex-row  justify-around">
        <div class="flex flex-col">
          <div
            class="inline-flex overflow-hidden relative justify-center items-center 
            w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <span class="text-7xl text-gray-600 dark:text-gray-300">
              {username[0].toUpperCase()}
            </span>
          </div>
          <p class="text-3xl text-gray-900 dark:text-black">{username}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-base text-gray-900 dark:text-black">
            {" "}
            Learned {wordsLearned} words
          </p>
          <p class="text-base text-gray-900 dark:text-black">
            Learned {lessonsLearned} lessons
          </p>
        </div>
        <div class="space-y-4 box-border h-4/5 w-3/5 p-4 border-4">
          {isLoading
            ? "aaaa"
            : activities.map((activity) => (
                <div key={activity.id}>
                  {activity.activity_description === "follow" ||
                  activity.activity_description === "unfollow" ? (
                    <p class="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                      {activity.user} {activity.activity_description}{" "}
                      {activity.follow}{" "}
                      <ReactTimeAgo date={activity.created_at} locale="en-US" />
                    </p>
                  ) : (
                    <p class="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                      {activity.user} {activity.activity_description}{" "}
                      {activity.follow}{" "}
                      <ReactTimeAgo date={activity.created_at} locale="en-US" />
                    </p>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
