import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "./navbar";

function Dashboard() {
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonsLearned, setLessonsLearned] = useState();
  const [wordsLearned, setWordsLearned] = useState();
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
    <div class="p-6 bg-gray-300 h-screen">
      <Navbar />
      <h5 class="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Dashboard
      </h5>
      <div class="flex flex-col place-items-center">
        <div
          class="inline-flex overflow-hidden relative justify-center items-center 
              w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <span class="text-7xl text-gray-600 dark:text-gray-300">
            {username[0].toUpperCase()}
          </span>
        </div>
        <p class="mt-3 text-3xl text-center text-gray-900 dark:text-black">
          {username}
        </p>
        <div class="flex flex-row space-x-4">
          <Link to="/words-learned">
            <p class="text-base text-gray-900 dark:text-black underline ">
              Learned {wordsLearned} Words
            </p>
          </Link>
          <p class="text-base text-gray-900 dark:text-black underline ">
            Learned {lessonsLearned} Lessons
          </p>
        </div>
        <div class="space-y-4 h-4/5 w-3/5 p-4 border-t-4 border-gray-900 mt-5">
          {isLoading
            ? ""
            : activities.map((activity) => (
                <div key={activity.id}>
                  {activity.activity_description === "follow" ||
                  activity.activity_description === "unfollow" ? (
                    <div class="flex flex-row place-content-between">
                      <div class="flex flex-row space-x-2">
                        <h3 class="tracking-tighter text-blue-800  md:text-lg ">
                          {activity.user}
                        </h3>
                        <p class="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                          {activity.activity_description}
                        </p>
                        <h3 class="tracking-tighter text-blue-800  md:text-lg ">
                          {activity.follow}
                        </h3>
                      </div>
                      <ReactTimeAgo date={activity.created_at} locale="en-US" />
                    </div>
                  ) : (
                    <div class="flex flex-row place-content-between">
                      <div class="flex flex-row space-x-2">
                        <h3 class="tracking-tighter text-blue-800  md:text-lg ">
                          {activity.user}
                        </h3>
                        <p class="tracking-tighter text-gray-500 md:text-lg dark:text-black">
                          learned {activity.quiz.total_check_answers} of{" "}
                          {activity.quiz.total_words} words in
                        </p>
                        <h3 class="tracking-tighter text-blue-800  md:text-lg ">
                          {activity.quiz.category_name}
                        </h3>
                      </div>

                      <ReactTimeAgo date={activity.created_at} locale="en-US" />
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
