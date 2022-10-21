import axios from "axios";

export default {
  async getUserDetails(query) {
    const { username, token, follower, following } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/user_details/${username}/${follower}/${following}/`,
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
      `http://127.0.0.1:8000/edit_user_details/${id}/`,
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
