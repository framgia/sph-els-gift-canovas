import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async dashboardUserActivity(query) {
    const { username, page, token } = query;
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/activity_log/${page}/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
};
