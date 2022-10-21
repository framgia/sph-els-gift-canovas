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
  async getNumberOfFollowersFollowing(query) {
    const { token, username } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/number_of_followers_following/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
