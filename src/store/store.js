export default (joint) => {
  console.log(joint)
  return {
    state: {
      isLogin: true,
      common: {},
      test: null
    },
    mutations: {
      LOGIN(state, flag) {
        state.isLogin = flag
      }
    },
    actions: {
      common({state}, comNo) {
        return new Promise(resolve => {
          if (state.common[comNo]) {
            resolve(state.common[comNo])
          } else {
            joint.model.getCommonItems({comNo}).then(res => {
              state.common[comNo] = res.data
              resolve(res.data)
            })
          }
        })
      }
    },
    getters: {
      isLogin(state) {
        return state.isLogin
      }
    }
  }
}