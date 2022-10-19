import axios from "axios";

export default {
  async getUserDetails(query) {
    const { username, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/user_details/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
