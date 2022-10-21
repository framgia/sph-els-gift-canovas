import axios from "axios";

export default {
  async getNotAdminUsers(query) {
    const { token, username } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/not_admin_users/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
