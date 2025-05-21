import api from './api';

const BASE_URL = '/faculty';

export const facultyService = {
  // Get all faculty members
  getAll() {
    return api.get(BASE_URL);
  },

  // Get a single faculty member by ID
  getById(id) {
    return api.get(`${BASE_URL}/${id}`);
  },

  // Create a new faculty member
  create(facultyData) {
    return api.post(BASE_URL, facultyData);
  },

  // Update an existing faculty member
  update(id, facultyData) {
    return api.put(`${BASE_URL}/${id}`, facultyData);
  },

  // Delete a faculty member
  delete(id) {
    return api.delete(`${BASE_URL}/${id}`);
  }
}; 