import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "../../api";
import Loader from "../loader";
import Navbar from "./navbar";

function AdminWordsPerCategory() {
  const location = useLocation();
  const { data } = location.state;
  const { id } = data;
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await API.word
      .getWordsPerCategory({
        token,
        id,
      })
      .then((data) => {
        setWords(data.data);
        setIsLoading(false);
      });
  };
  const handleDeleteWord = async (id) => {
    setIsLoading(true);
    await API.word
      .deleteWord({
        token,
        id,
      })
      .then(() => {
        toast.success("Successfully Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 md:h-screen lg:h-screen cursor-default">
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
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          Words in Category : {words.category_name}
        </h5>
        {isLoading ? (
          <div className="text-center mt-44">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col place-items-center mt-5">
            <ul className="w-full text-xl font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <div className="flex flex-row">
                <li className="py-2 px-4 w-6/12 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                  Word
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Correct Answer
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Choice A
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Choice B
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Choice C
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Choice D
                </li>
                <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                  Action
                </li>
              </div>
            </ul>
            <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white mt-8">
              {words.words.map((word) => (
                <div key={word.word_id} className="flex flex-row">
                  <li className="py-2 px-4 w-6/12 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    {word.word}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    {word.correct_answer}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    {word.choice_a}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    {word.choice_b}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    {word.choice_c}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    {word.choice_d}
                  </li>
                  <li className="py-2 px-4 w-3/4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex flex-row space-x-3 cursor-pointer">
                      <Link
                        to="/admin-edit-word-and-choices"
                        state={{ data: word }}
                      >
                        <p className="underline">Edit Word</p>
                      </Link>
                      <p className="underline">|</p>
                      <p
                        className="underline"
                        onClick={() => handleDeleteWord(word.word_id)}
                      >
                        Delete Word
                      </p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminWordsPerCategory;
