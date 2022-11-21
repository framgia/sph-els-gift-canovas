import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "./navbar";
const { REACT_APP_BASE_URL } = process.env;

function WordsLearned() {
  const [listOfWordsLearned, setListOfWordsLearned] = useState([]);
  const [wordsLearned, seWordsLearned] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [hasProfile, setHasProfile] = useState();

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
    await API.word
      .getWordsLearned({
        username,
        token,
      })
      .then((data) => {
        setListOfWordsLearned(data.data);
      });
    await API.results
      .userQuizResults({
        username,
        token,
      })
      .then((data) => {
        seWordsLearned(data.data.number_of_words_learned);
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
        Words Learned
      </h5>
      <div class="flex flex-col place-items-center">
        <div class="inline-flex overflow-hidden relative justify-center items-center w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
          <span class="text-7xl text-gray-600 dark:text-gray-300">
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
            <p className="text-base text-gray-900 dark:text-black underline">
              Learned {wordsLearned} Words
            </p>
          </Link>
        </div>
        <div className="space-y-4 h-4/5 w-3/5 p-4 border-t-4 border-gray-900 mt-5">
          <div className="flex flex-row justify-around mb-10">
            <p className="text-gray-500 font-semibold md:text-lg dark:text-black">
              Word
            </p>
            <p className="text-gray-500 font-semibold md:text-lg dark:text-black">
              Answer
            </p>
          </div>
          {isLoading ? (
            ""
          ) : (
            <>
              {listOfWordsLearned.length === 0 ? (
                <p className="text-2xl text-center mt-44 font-semibold">
                  No Words Learned
                </p>
              ) : (
                listOfWordsLearned.map((word, index) => (
                  <div key={index} className="flex flex-row justify-around">
                    <p className="text-base text-gray-500 dark:text-black">
                      {word.user_answer}
                    </p>
                    <p className="text-base text-gray-500 dark:text-black">
                      {word.word}
                    </p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WordsLearned;
