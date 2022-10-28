import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../api";
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
    <div class="p-6 bg-gray-300 h-screen">
      <Navbar />
      {isLoading ? (
        ""
      ) : (
        <>
          {userAnswers.length !== wordsLength && (
            <div class="flex flex-col place-items-center">
              <div class="flex flex-row space-x-72 mt-20">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {words.category_name}
                </h5>
                <h4 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {index + 1} of {wordsLength}
                </h4>
              </div>
              <p class="text-4xl font-semibold text-gray-900 dark:text-blackl text-center mt-10">
                {words.words[index].word}
              </p>

              <div class="flex flex-row mt-12 space-x-12">
                <button
                  onClick={() => nextIndex(words.words[index].choice_a)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_a}
                  </span>
                </button>
                <button
                  onClick={() => nextIndex(words.words[index].choice_b)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_b}
                  </span>
                </button>

                <button
                  onClick={() => nextIndex(words.words[index].choice_c)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {words.words[index].choice_c}
                  </span>
                </button>
                <button
                  onClick={() => nextIndex(words.words[index].choice_d)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
