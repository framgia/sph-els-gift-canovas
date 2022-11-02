import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async login(query) {
    const { username, password } = query;
    const response = await axios.post(`${BASE_URL}/auth/`, {
      username,
      password,
    });
    return response;
  },
};
