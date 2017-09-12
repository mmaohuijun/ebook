import $storage from 'api/storage'

const cases = {
  state: {
    caseId: '',
    caseName: ''
  },
  mutations: {
    SET_CASE_ID(state, id) {
      state.caseId = id
    },
    SET_CASE_NAME(state, name) {
      state.caseName = name
    }
  },
  actions: {
    setCaseId({ commit, dispatch }, id) {
      commit('SET_CASE_ID', id)
    },
    setCaseName({ commit, dispatch }, name) {
      dispatch('clearCaseName')
      commit('SET_CASE_NAME', name)
      $storage.sessionStorage.setItem('CASE_NAME', name)
    },
    clearCaseName() {
      $storage.sessionStorage.removeItem('CASE_NAME')
    }
  }
}

export default cases
