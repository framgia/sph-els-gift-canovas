import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async userAnswers(query) {
    const { token, category_id, username, userAnswers } = query;
    const response = await axios.post(
      `${BASE_URL}/user_answer/`,
      {
        category_id,
        username,
        userAnswers,
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
