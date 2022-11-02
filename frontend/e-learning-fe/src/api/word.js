import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async getWordsPerCategory(query) {
    const { id, token } = query;
    const response = await axios.get(`${BASE_URL}/get_words/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },

  async getWordsLearned(query) {
    const { username, token } = query;
    const response = await axios.get(`${BASE_URL}/words_learned/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
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
      `${BASE_URL}/add_words_choices/`,
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
    const response = await axios.delete(`${BASE_URL}/delete_word/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },

  async editWordChoices(query) {
    const {
      token,
      word,
      id,
      correct_answer,
      choice_a,
      choice_b,
      choice_c,
      choice_d,
    } = query;
    const response = await axios.put(
      `${BASE_URL}/edit_word_choices/${id}`,
      {
        word,
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
};
