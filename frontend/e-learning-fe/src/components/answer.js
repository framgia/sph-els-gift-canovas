import React, { useEffect, useState } from "react";
import Choices from "./choices";
import API from "../api";

function Answer() {
  const [words, setWords] = useState([]);
  const [category, setCategory] = useState([]);

  const token = localStorage.getItem("token");
  const category_id = 1;

  const fetchData = async () => {
    await API.word
      .getWordsPerCategory({
        id: category_id,
        token,
      })
      .then((data) => {
        setCategory(data.data.category_name);
        setWords(data.data.words[0]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="p-6">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        {category}
      </h5>
      <div class="flex flex-row place-content-left p-6 flex space-x-24 ">
        <p class="text-4xl font-semibold text-gray-900 dark:text-blackl">
          {words.word}
        </p>
        <div class="flex flex-col">
          <Choices choice={words.choice_a} />
          <Choices choice={words.choice_b} />
          <Choices choice={words.choice_c} />
          <Choices choice={words.choice_d} />
        </div>
      </div>
    </div>
  );
}

export default Answer;
