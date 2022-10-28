import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import API from "../../api";
import Navbar from "./navbar";

function AdminEditWordAndChoices() {
  const location = useLocation();
  const { data } = location.state;
  const {
    word_id,
    word: propWord,
    correct_answer: propCorrectAnswer,
    choice_a: propChoiceA,
    choice_b: propChoiceB,
    choice_c: propChoiceC,
    choice_d: propChoiceD,
  } = data;
  const [word, setWord] = useState(propWord);
  const [correctAnswer, setCorrectAnswer] = useState(propCorrectAnswer);
  const [choiceA, setChoiceA] = useState(propChoiceA);
  const [choiceB, setChoiceB] = useState(propChoiceB);
  const [choiceC, setChoiceC] = useState(propChoiceC);
  const [choiceD, setChoiceD] = useState(propChoiceD);

  const token = localStorage.getItem("token");

  const handleEditWord = async () => {
    await API.word
      .editWordChoices({
        id: word_id,
        token,
        word,
        correct_answer: correctAnswer,
        choice_a: choiceA,
        choice_b: choiceB,
        choice_c: choiceC,
        choice_d: choiceD,
      })
      .then(() => {
        toast.success("Edit Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div class="p-6 bg-gray-300 h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <p class="text-4xl font-bold text-gray-900 dark:text-black py-6 mt-12">
        Edit Word
      </p>
      <div class="flex flex-row space-x-4 ">
        <div class="flex flex-col">
          <div>
            <label
              for="word"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Word
            </label>
            <input
              type="text"
              id="word"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setWord(e.target.value)}
              defaultValue={word}
            />
          </div>
          <div>
            <label
              for="correctAnswer"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Correct Answer
            </label>
            <input
              type="text"
              id="correctAnswer"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              defaultValue={correctAnswer}
            />
          </div>
        </div>

        <div class="flex flex-col">
          <div>
            <label
              for="choiceA"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Choice A
            </label>
            <input
              type="text"
              id="choiceA"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setChoiceA(e.target.value)}
              defaultValue={choiceA}
            />
          </div>

          <div>
            <label
              for="choiceB"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Choice B
            </label>
            <input
              type="text"
              id="choiceB"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setChoiceB(e.target.value)}
              defaultValue={choiceB}
            />
          </div>
          <div>
            <label
              for="choiceC"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Choice C
            </label>
            <input
              type="text"
              id="choiceC"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setChoiceC(e.target.value)}
              defaultValue={choiceC}
            />
          </div>
          <div>
            <label
              for="choiceD"
              class="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Choice D
            </label>
            <input
              type="text"
              id="choiceD"
              class="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
                border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
              onChange={(e) => setChoiceD(e.target.value)}
              defaultValue={choiceD}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
        focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleEditWord}
      >
        Edit
      </button>
    </div>
  );
}

export default AdminEditWordAndChoices;
