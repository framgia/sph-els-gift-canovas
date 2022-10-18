import axios from "axios";

export default {
  async getResults(query) {
    const { quiz_taken_id, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/results/${quiz_taken_id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
};
