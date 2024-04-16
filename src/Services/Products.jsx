
import axios from 'axios';

const API_URL = 'http://iroidtechnologies.in/Fressery';

export const Products = {
  async getProductsList() {
    try {
      const response = await axios.get(`${API_URL}/Fressery_Api/products`);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};
