import axios from "axios";

export default {
  async login(query) {
    const { username, password } = query;
    const response = await axios.post("http://127.0.0.1:8000/auth/", {
      username,
      password,
    });
    return response;
  },
};
