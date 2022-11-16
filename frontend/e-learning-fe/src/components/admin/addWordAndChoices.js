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
  const [isDisableAdd, setIsDisableAdd] = useState(true);

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
      setIsDisableAdd(false);
  };

  const handleAddWordChoices = async () => {
    setIsDisableAdd(true);
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
    setTimeout(() => {
      setIsDisableAdd(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-300 h-screen cursor-default">
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
      <div className="p-6">
        <p className="text-4xl font-bold text-gray-900 dark:text-black">
          Add Word and Choices
        </p>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col">
            <div>
              <label
                htmlFor="word"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Word
              </label>
              <input
                type="text"
                id="word"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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
                htmlFor="correctAnswer"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Correct Answer
              </label>
              <input
                type="text"
                id="correctAnswer"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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

          <div className="flex flex-col">
            <div>
              <label
                htmlFor="choiceA"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Choice A
              </label>
              <input
                type="text"
                id="choiceA"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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
                htmlFor="choiceB"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Choice B
              </label>
              <input
                type="text"
                id="choiceB"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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
                htmlFor="choiceC"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Choice C
              </label>
              <input
                type="text"
                id="choiceC"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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
                htmlFor="choiceD"
                className="block mb-2 text-sm font-medium text-black dark:text-black"
              >
                Choice D
              </label>
              <input
                type="text"
                id="choiceD"
                className="block p-2 w-80 text-gray-900 bg-gray-50 rounded-lg 
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
        <button
          type="button"
          className={`mt-3 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 
            font-medium rounded-full text-sm px-8 py-2.5 text-center mr-2 mb-2 ${
              isDisableAdd ? "bg-gray-700" : "bg-blue-700"
            }`}
          onClick={handleAddWordChoices}
          disabled={isDisableAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AdminAddWordAndChoices;
