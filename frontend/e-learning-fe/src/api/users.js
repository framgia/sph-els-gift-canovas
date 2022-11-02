import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async getNotAdminUsers(query) {
    const { token, username } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/not_admin_users/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
  async getAdminUsers(query) {
    const { token, username } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/admin_users/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
