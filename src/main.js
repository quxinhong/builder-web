import Vue from 'vue'
import App from './App.vue'

import './themes/red/index.css'
import ElementUI from 'element-ui';
Vue.use(ElementUI, {size: "mini"})
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/3024-night.css';
//代码折叠
/*import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'*/
//全屏模式
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen.js'
//括号匹配
import 'codemirror/addon/edit/matchbrackets.js'
//自动补全
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/sql-hint.js'

//行注释
import 'codemirror/addon/comment/comment.js'
//代码错误检查
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/json-lint.js'

/*VueCodeMirror.commands.autocomplete = function(cm) {
  console.log(cm)
  cm.showHint({hint: VueCodeMirror.hint.anyword});
};*/

Vue.use(VueCodeMirror)
Vue.config.productionTip = false

import mixin from "./common/mixins";
Vue.mixin(mixin)

let joint = {}
import util from "./common/util";
Vue.use(util, joint)
import model from "./common/model"
Vue.use(model, joint)
import local from "./common/local";
Vue.use(local, joint)
import Store from './store'
const store = Store(Vue, joint)
import Router from "./router"
const router = Router(Vue, joint)

import ItemTitle from "./components/common/ItemTitle";
Vue.component("item-title", ItemTitle)
import JCommon from "./components/common/JCommon";
Vue.component("j-common", JCommon)
import AppManager from "./views/AppManager";
Vue.component("j-app-manager", AppManager)
import DataBase from "./views/DataBase";
Vue.component("j-data-base", DataBase)
import Module from "./views/Module";
Vue.component("j-module", Module)
import Versions from "./views/Versions";
Vue.component("j-versions", Versions)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
