//建议所有缓存localStorage写在这里
import localstore from './localstore'

let ver = 'jane';
export default (Vue, joint) => {
    // 存储集合
    let local = joint.local = Vue.prototype.$local = {
        user(val) {
            let key = 'vue_user' + ver;
            if (val) {
                if (val === 'remove') {
                    localstore.removeSession(key)
                } else {
                    localstore.sessionSet(key, val, -1)
                }
            }
            return localstore.getSession(key);
        },
    }
    return local;
}