import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default {
  async getCategoryByUser(query) {
    const { username, token } = query;
    const response = await axios.get(`${REACT_APP_BASE_URL}/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },
  async getCategories(query) {
    const { token } = query;
    const response = await axios.get(`${REACT_APP_BASE_URL}/category_list/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response;
  },

  async addCategory(query) {
    const { token, category_name, description } = query;
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/add_category/`,
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

  async editCategory(query) {
    const { token, id, category_name, description } = query;
    const response = await axios.put(
      `${REACT_APP_BASE_URL}/edit_category/${id}`,
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

  async deleteCategory(query) {
    const { token, id } = query;
    const response = await axios.delete(
      `${REACT_APP_BASE_URL}/delete_category/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
};
