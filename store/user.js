export const state = {
  userInfo: {}
};

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
    // console.log(state.username)
  },

};

export const actions = {
  Login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then(res => {
      //   console.log(res.data)
      store.commit('setUserInfo', res.data)

      // this.$router.push({
      //   path: '/air'
      // });
      this.$router.back()

        // console.log(store.state.userInfo)
      return true
    })
  },

  // 发送验证码
  sendCaptcha(store, data) {
    return this.$axios({
      url: '/captchas',
      method: 'POST',
      data: {
        tel: data
      }
    })
  }
}
