import api from './api';

const BASE_URL = '/dorms';

export const dormService = {
  // Get all dorms
  getAll() {
    return api.get(BASE_URL);
  },

  // Get a single dorm by ID
  getById(id) {
    return api.get(`${BASE_URL}/${id}`);
  },

  // Create a new dorm
  create(dormData) {
    return api.post(BASE_URL, dormData);
  },

  // Update an existing dorm
  update(id, dormData) {
    return api.put(`${BASE_URL}/${id}`, dormData);
  },

  // Delete a dorm
  delete(id) {
    return api.delete(`${BASE_URL}/${id}`);
  },

  // Get available rooms in a dorm
  getAvailableRooms(dormId) {
    return api.get(`${BASE_URL}/${dormId}/available-rooms`);
  }
}; 