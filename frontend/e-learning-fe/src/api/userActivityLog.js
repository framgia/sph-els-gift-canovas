import axios from "axios";

export default {
  async dashboardUserActivity(query) {
    const { username, page, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/activity_log/${page}/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
