import axios from "axios";

export default {
  async getWordsPerCategory(query) {
    const { id, token } = query;
    const response = await axios.get(`http://127.0.0.1:8000/get_words/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },
  async getWordsLearned(query) {
    const { username, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/words_learned/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },

  async addWordChoices(query) {
    const {
      token,
      word,
      category_id,
      correct_answer,
      choice_a,
      choice_b,
      choice_c,
      choice_d,
    } = query;
    const response = await axios.post(
      "http://127.0.0.1:8000/add_words_choices/",
      {
        word,
        category_id,
        correct_answer,
        choice_a,
        choice_b,
        choice_c,
        choice_d,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
  async deleteWord(query) {
    const { token, id } = query;
    const response = await axios.delete(
      `http://127.0.0.1:8000/delete_word/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
};
