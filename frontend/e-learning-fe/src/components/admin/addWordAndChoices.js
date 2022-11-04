import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import API from "../../api";
import Navbar from "./navbar";

function AdminAddWordAndChoices() {
  const location = useLocation();
  const { data } = location.state;
  const { id } = data;
  const [word, setWord] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [isDisableAdd, setIsDisableAdd] = useState(false);

  const token = localStorage.getItem("token");

  const checkFields = () => {
    if (
      word !== "" &&
      correctAnswer !== "" &&
      choiceA !== "" &&
      choiceB !== "" &&
      choiceC !== "" &&
      choiceD !== ""
    )
      setIsDisableAdd(true);
  };

  const handleAddCategory = async () => {
    await API.word
      .addWordChoices({
        word,
        category_id: id,
        correct_answer: correctAnswer,
        choice_a: choiceA,
        choice_b: choiceB,
        choice_c: choiceC,
        choice_d: choiceD,
        token,
      })
      .then((data) => {
        if (data === 200) {
          toast.success("Successfully Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Correct answer not in the choices", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
        Add Word and Choices
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
              onChange={(e) => {
                setWord(e.target.value);
                checkFields();
              }}
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
              onChange={(e) => {
                setCorrectAnswer(e.target.value);
                checkFields();
              }}
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
              onChange={(e) => {
                setChoiceA(e.target.value);
                checkFields();
              }}
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
              onChange={(e) => {
                setChoiceB(e.target.value);
                checkFields();
              }}
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
              onChange={(e) => {
                setChoiceC(e.target.value);
                checkFields();
              }}
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
              onChange={(e) => {
                setChoiceD(e.target.value);
                checkFields();
              }}
            />
          </div>
        </div>
      </div>
      {isDisableAdd ? (
        <button
          type="button"
          class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
        focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleAddCategory}
        >
          Add
        </button>
      ) : (
        <button
          type="button"
          class="mt-3 text-white bg-blue-700  focus:outline-none focus:ring-4 
              focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 
              dark:bg-gray-600 dark:focus:ring-blue-800"
          disabled
        >
          Add
        </button>
      )}
    </div>
  );
}

export default AdminAddWordAndChoices;
