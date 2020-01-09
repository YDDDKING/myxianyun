export const state = {
  history: [],
  allPrice: 0
};

export const mutations = {
  setHistory(state, data) {
    state.history.unshift(data)
  },
  setPrice(state, data) {
    state.allPrice = data
  }

};
