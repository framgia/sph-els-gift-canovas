import axios from "axios";

export default {
  async getCategoryByUser(query) {
    const { username, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/category/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
