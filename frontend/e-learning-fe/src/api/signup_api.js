import axios from "axios";
const { BASE_URL } = process.env;

export default {
  async signUp(query) {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword: confirm_password,
      isAdmin: is_admin,
    } = query;
    const response = await axios
      .post(`${BASE_URL}/register/`, {
        username,
        firstname,
        lastname,
        email,
        password,
        confirm_password,
        is_admin,
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
};
