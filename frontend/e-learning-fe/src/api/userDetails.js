import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async getUserDetails(query) {
    const { username, token, follower, following } = query;
    const response = await axios.get(
      `${BASE_URL}/${username}/${follower}/${following}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },

  async editUserDetails(query) {
    const {
      id,
      username,
      firstname,
      lastname,
      email,
      password,
      confirm_password,
      token,
    } = query;
    const response = await axios.put(
      `${BASE_URL}/edit_user_details/${id}/`,
      {
        username,
        firstname,
        lastname,
        email,
        password,
        confirm_password,
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
