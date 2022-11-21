import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../api";
import Loader from "./loader";
import Navbar from "./navbar";

function Answer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId: category_id } = location.state;

  const [userAnswers, setUserAnswers] = useState([]);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [wordsLength, setWordsLength] = useState(0);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  let newAnswer = [];

  const fetchData = async () => {
    await API.word
      .getWordsPerCategory({
        id: category_id,
        token,
      })
      .then((data) => {
        setWords(data.data);
        setWordsLength(data.data.words.length);
        setIsLoading(false);
      });
  };

  const nextIndex = (answer) => {
    if (index <= wordsLength - 1) {
      newAnswer = {
        userAnswer: answer,
        correct_answer: words.words[index].correct_answer,
        word: words.words[index].word,
        word_id: words.words[index].word_id,
      };
      setUserAnswers([...userAnswers, newAnswer]);
      setIndex(index + 1);
    }
  };

  const saveAnswers = async () => {
    const result = await API.user_answer
      .userAnswers({
        token,
        category_id,
        username,
        userAnswers,
      })
      .then((data) => {
        navigate("/results", {
          state: { quizTakenId: data.data.quiz_taken_id },
        });
      });
  };

  useEffect(() => {
    if (wordsLength && index === wordsLength) {
      saveAnswers();
    }
  }, [userAnswers]);

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
        <>
          {userAnswers.length !== wordsLength && (
            <div className="flex flex-col place-items-center cursor-default mt-10">
              <div className="flex flex-row space-x-72">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {words.category_name}
                </h5>
                <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {index + 1} of {wordsLength}
                </h4>
              </div>
              <p className="text-4xl font-semibold text-gray-900 dark:text-blackl text-center mt-10">
                {words.words[index].word}
              </p>

              <div className="flex flex-row mt-12 space-x-12">
                <button
                  onClick={() => nextIndex(words.words[index].choice_a)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_a}
                  </span>
                </button>
                <button
                  onClick={() => nextIndex(words.words[index].choice_b)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_b}
                  </span>
                </button>

                <button
                  onClick={() => nextIndex(words.words[index].choice_c)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_c}
                  </span>
                </button>
                <button
                  onClick={() => nextIndex(words.words[index].choice_d)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_d}
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Answer;
