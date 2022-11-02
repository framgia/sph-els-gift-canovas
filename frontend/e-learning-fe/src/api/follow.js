import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async follow(query) {
    const { token, follower_username, following_username } = query;
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/follow/`,
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
      `${REACT_APP_BASE_URL}/number_of_followers_following/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
  async unfollow(query) {
    const { token, follower_username, following_username } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/unfollow/${follower_username}/${following_username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
