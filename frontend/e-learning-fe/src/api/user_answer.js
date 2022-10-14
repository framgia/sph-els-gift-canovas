import axios from "axios";

export default {
  async userAnswers(query) {
    const { token, category_id, username, userAnswers } = query;
    const response = await axios.post(
      "http://127.0.0.1:8000/user_answer/",
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
