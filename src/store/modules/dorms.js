import { dormService } from '@/services/dormService';

export default {
  namespaced: true,
  
  state: {
    dorms: [],
    currentDorm: null,
    availableRooms: [],
    loading: false,
    error: null
  },

  mutations: {
    SET_DORMS(state, dorms) {
      state.dorms = dorms;
    },
    SET_CURRENT_DORM(state, dorm) {
      state.currentDorm = dorm;
    },
    SET_AVAILABLE_ROOMS(state, rooms) {
      state.availableRooms = rooms;
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
        const response = await dormService.getAll();
        commit('SET_DORMS', response.data);
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
        const response = await dormService.getById(id);
        commit('SET_CURRENT_DORM', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchAvailableRooms({ commit }, dormId) {
      commit('SET_LOADING', true);
      try {
        const response = await dormService.getAvailableRooms(dormId);
        commit('SET_AVAILABLE_ROOMS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async create({ commit }, dormData) {
      commit('SET_LOADING', true);
      try {
        const response = await dormService.create(dormData);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async update({ commit }, { id, dormData }) {
      commit('SET_LOADING', true);
      try {
        const response = await dormService.update(id, dormData);
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
        await dormService.delete(id);
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
    getAllDorms: state => state.dorms,
    getCurrentDorm: state => state.currentDorm,
    getAvailableRooms: state => state.availableRooms,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}; 