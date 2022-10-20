import axios from "axios";

export default {
  async follow(query) {
    const { token, follower_username, following_username } = query;
    const response = await axios.post(
      "http://127.0.0.1:8000/follow/",
      {
        follower_username,
        following_username,
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
