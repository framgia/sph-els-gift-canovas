import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import API from "../api";
import Loader from "./loader";
import Navbar from "./navbar";

function Results() {
  const location = useLocation();
  const { quizTakenId } = location.state;
  const [results, setResults] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await API.results
      .getResults({
        quiz_taken_id: quizTakenId,
        token,
      })
      .then((data) => {
        setResults(data.data);
        setIsloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="bg-gray-300 md:h-screen lg:h-screen cursor-default">
      <Navbar />
      <h5 class="p-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        Results
      </h5>
      {isLoading ? (
        <div class="text-center mt-44">
          <Loader />
        </div>
      ) : (
        <div class="flex flex-col place-items-center">
          <ul
            class="w-8/12 text-xl font-medium text-gray-900 bg-white rounded-lg border
            border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <div class="flex flex-row">
              <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"></li>
              <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                Word
              </li>
              <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                Answer
              </li>
            </div>
          </ul>
          <ul
            class="w-8/12 text-sm font-medium text-gray-900 bg-white rounded-lg border
              border-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:text-white mt-8"
          >
            {results.map((data) => (
              <div class="flex flex-row">
                {data.is_correct === true ? (
                  <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </li>
                ) : (
                  <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </li>
                )}
                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.word}
                </li>
                <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  {data.user_answer}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Results;
