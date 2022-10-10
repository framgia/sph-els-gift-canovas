import axios from "axios";

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
      .post("http://127.0.0.1:8000/register/", {
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
