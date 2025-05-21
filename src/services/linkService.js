import api from './api';

const BASE_URL = '/links';

export const linkService = {
  // Get all links
  getAll() {
    return api.get(BASE_URL);
  },

  // Get a single link by ID
  getById(id) {
    return api.get(`${BASE_URL}/${id}`);
  },

  // Create a new link
  create(linkData) {
    return api.post(BASE_URL, linkData);
  },

  // Update an existing link
  update(id, linkData) {
    return api.put(`${BASE_URL}/${id}`, linkData);
  },

  // Delete a link
  delete(id) {
    return api.delete(`${BASE_URL}/${id}`);
  },

  // Get links by category
  getByCategory(category) {
    return api.get(`${BASE_URL}/category/${category}`);
  }
}; 