import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async getResults(query) {
    const { quiz_taken_id, token } = query;
    const response = await axios.get(`${BASE_URL}/results/${quiz_taken_id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response;
  },

  async userQuizResults(query) {
    const { username, token } = query;
    const response = await axios.get(`${BASE_URL}/quiz_results/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },
};
