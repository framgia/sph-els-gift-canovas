import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async login(query) {
    const { username, password } = query;
    const response = await axios.post(`${REACT_APP_BASE_URL}/auth/`, {
      username,
      password,
    });
    return response;
  },
};
