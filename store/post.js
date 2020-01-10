export const state = {
  caogao: []
};

export const mutations = {
  setCaogao(state, data) {
    // console.log(data)
    state.caogao.unshift({
      data
    })
    // console.log(state.caogao)
    // state.caogao = []
  },
  
  clearCaogao(state, data) {
    state.caogao = []
  }
};

export const actions = {

}
