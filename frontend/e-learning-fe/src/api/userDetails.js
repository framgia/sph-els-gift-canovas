import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async getUserDetails(query) {
    const { username, token, follower, following } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/user_details/${username}/${follower}/${following}/`,
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
      `${REACT_APP_BASE_URL}/edit_user_details/${id}/`,
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
  async uploadProfile(query) {
    const { body, token } = query;
    const response = await axios
      .post(`${REACT_APP_BASE_URL}/upload_profile_picture/`, body, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const result = error.response;
        return result;
      });

    return response;
  },

  async editUploadProfile(query) {
    const { id, body, token } = query;
    const response = await axios.put(
      `${REACT_APP_BASE_URL}/update_profile_picture/${id}`,
      body,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
