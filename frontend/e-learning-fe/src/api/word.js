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
};