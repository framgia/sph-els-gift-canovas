import React, { useEffect, useState } from "react";
import API from "../api";

function Answer() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [wordsLength, setwordsLength] = useState(0);
  const token = localStorage.getItem("token");
  const category_id = 1; //props for the category id
  let newAnswer = [];

  const fetchData = async () => {
    await API.word
      .getWordsPerCategory({
        id: category_id,
        token,
      })
      .then((data) => {
        setWords(data.data);
        setwordsLength(data.data.words.length);
        setLoading(true);
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
    const result = await API.user_answer.userAnswers({
      token,
      category_id,
      username,
      userAnswers,
    });
  };

  useEffect(() => {
    if (wordsLength !== 0) {
      if (index === wordsLength) {
        saveAnswers();
      }
    }
  }, [userAnswers]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6">
      {loading ? (
        <div>
          {userAnswers.length !== wordsLength && (
            <div>
              <div class="flex flex-row space-x-72 ">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {words.category_name}
                </h5>
                <h4 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {index + 1} of {wordsLength}
                </h4>
              </div>

              <div class="flex flex-row place-content-left p-6 flex space-x-24 ">
                <p class="text-4xl font-semibold text-gray-900 dark:text-blackl">
                  {words.words[index].word}
                </p>
                <div class="flex flex-col">
                  <button
                    class="text-white bg-gradient-to-r from-blue-500 
                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => nextIndex(words.words[index].choice_a)}
                  >
                    {words.words[index].choice_a}
                  </button>
                  <button
                    class="text-white bg-gradient-to-r from-blue-500 
                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => nextIndex(words.words[index].choice_b)}
                  >
                    {words.words[index].choice_b}
                  </button>
                  <button
                    class="text-white bg-gradient-to-r from-blue-500 
                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => nextIndex(words.words[index].choice_c)}
                  >
                    {words.words[index].choice_c}
                  </button>
                  <button
                    class="text-white bg-gradient-to-r from-blue-500 
                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => nextIndex(words.words[index].choice_d)}
                  >
                    {words.words[index].choice_d}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Answer;
