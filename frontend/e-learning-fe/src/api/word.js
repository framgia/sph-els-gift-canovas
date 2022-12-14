import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async getWordsPerCategory(query) {
    const { id, token } = query;
    const response = await axios.get(`${REACT_APP_BASE_URL}/get_words/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },

  async getWordsLearned(query) {
    const { username, token } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/words_learned/${username}`,
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
    const response = await axios
      .post(
        `${REACT_APP_BASE_URL}/add_words_choices/`,
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
      )
      .then((response) => {
        const result = response.status;
        return result;
      })
      .catch((error) => {
        const result = error.response.status;
        return result;
      });
    return response;
  },

  async deleteWord(query) {
    const { token, id } = query;
    const response = await axios.delete(
      `${REACT_APP_BASE_URL}/delete_word/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
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
      `${REACT_APP_BASE_URL}/edit_word_choices/${id}`,
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
