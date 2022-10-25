import axios from "axios";

export default {
  async getCategoryByUser(query) {
    const { username, token } = query;
    const response = await axios.get(
      `http://127.0.0.1:8000/category/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  },
  async getCategories(query) {
    const { token } = query;
    const response = await axios.get("http://127.0.0.1:8000/category_list/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response;
  },

  async addCategory(query) {
    const { token, category_name, description } = query;
    const response = await axios.post(
      "http://127.0.0.1:8000/add_category/",
      {
        category_name,
        description,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
};
