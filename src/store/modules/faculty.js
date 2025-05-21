import { facultyService } from '@/services/facultyService';

export default {
  namespaced: true,
  
  state: {
    faculty: [],
    currentFaculty: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_FACULTY(state, faculty) {
      state.faculty = faculty;
    },
    SET_CURRENT_FACULTY(state, faculty) {
      state.currentFaculty = faculty;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchAll({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await facultyService.getAll();
        commit('SET_FACULTY', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchById({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        const response = await facultyService.getById(id);
        commit('SET_CURRENT_FACULTY', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async create({ commit }, facultyData) {
      commit('SET_LOADING', true);
      try {
        const response = await facultyService.create(facultyData);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async update({ commit }, { id, facultyData }) {
      commit('SET_LOADING', true);
      try {
        const response = await facultyService.update(id, facultyData);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async delete({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await facultyService.delete(id);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getAllFaculty: state => state.faculty,
    getCurrentFaculty: state => state.currentFaculty,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}; 