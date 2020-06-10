import Vuex from 'vuex'
import store from "./store";

export default (Vue, joint) => {
  Vue.use(Vuex)
  const Store = joint.store = new Vuex.Store(store(joint))
  return Store
}
