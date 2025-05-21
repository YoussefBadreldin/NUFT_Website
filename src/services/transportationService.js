import api from './api';

const BASE_URL = '/transportation';

export const transportationService = {
  // Get all transportation routes
  getAll() {
    return api.get(BASE_URL);
  },

  // Get a single route by ID
  getById(id) {
    return api.get(`${BASE_URL}/${id}`);
  },

  // Create a new route
  create(routeData) {
    return api.post(BASE_URL, routeData);
  },

  // Update an existing route
  update(id, routeData) {
    return api.put(`${BASE_URL}/${id}`, routeData);
  },

  // Delete a route
  delete(id) {
    return api.delete(`${BASE_URL}/${id}`);
  },

  // Get routes by type (bus, shuttle, etc.)
  getByType(type) {
    return api.get(`${BASE_URL}/type/${type}`);
  },

  // Get schedule for a specific route
  getSchedule(routeId) {
    return api.get(`${BASE_URL}/${routeId}/schedule`);
  }
}; 