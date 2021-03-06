import http from "./http";

export default (Vue, joint) => {
  const ajax = http(joint);
  return joint.model = Vue.prototype.$model = {
    login(obj) {return ajax.post("/builder/user/login", obj);},
    commonList(obj) {return ajax.get("/builder/common/commonList", obj)},
    addCommon(obj) {return ajax.post("/builder/common/addCommon", obj)},
    modifyCommon(obj) {return ajax.post("/builder/common/modifyCommon", obj)},
    getCommon(obj) {return ajax.get("/builder/common/getCommon", obj)},
    getCommonItems(obj) {return ajax.get("/builder/common/getCommonItems", obj)},
    saveMenu(obj) {return ajax.post("/builder/menu/saveMenu", obj)},
    getMenus() {return ajax.get("/builder/menu/getMenus", {})},
    getMenu(obj) {return ajax.get("/builder/menu/getMenu", obj)},
    delMenu(obj) {return ajax.get("/builder/menu/delMenu", obj)},
    addApp(obj) {return ajax.post("/builder/app/addApp", obj)},
    modifyApp(obj) {return ajax.post("/builder/app/modifyApp", obj)},
    delApp(obj) {return ajax.get("/builder/app/delApp", obj)},
    getApps(obj) {return ajax.get("/builder/app/getApps", obj)},
    getApp(obj) {return ajax.get("/builder/app/getApp", obj)},
    addDDL(obj) {return ajax.post("/builder/ddl/addDDL", obj)},
    getDDLIdxs() {return ajax.get("/builder/ddl/getDDLIdxs", {})},
    getDDL(obj) {return ajax.get("/builder/ddl/getDDL", obj)},
    executeSql(obj) {return ajax.post("/builder/sql/execute", obj)},
    addApi(obj) {return ajax.post("/builder/api/addApi", obj)},
    addStep(obj) {return ajax.post("/builder/api/addStep", obj)},
    modifyApi(obj) {return ajax.post("/builder/api/modifyApi", obj)},
    modifyStep(obj) {return ajax.post("/builder/api/modifyStep", obj)},
    delApi(obj) {return ajax.get("/builder/api/delApi", obj)},
    delStep(obj) {return ajax.get("/builder/api/delStep", obj)},
    getStep(obj) {return ajax.get("/builder/api/getStep", obj)},
    getApis(obj) {return ajax.get("/builder/api/getApis", obj)},
    getSteps(obj) {return ajax.get("/builder/api/getSteps", obj)},
    generateInDictionarys(obj) {return ajax.get("/builder/api/generateInDictionarys", obj)},
    generateOutDictionarys(obj) {return ajax.post("/builder/api/generateOutDictionarys", obj)},
    saveDictionarys(inOut, obj) {return ajax.post("/builder/api/saveDictionarys?inOut="+inOut, obj)},
    getDictionarys(obj) {return ajax.get("/builder/api/getDictionarys", obj)},
    getApi(obj) {return ajax.get("/builder/api/getApi", obj)},
    getTables() {return ajax.get("/builder/database/getTables", {})},
    getTable(obj) {return ajax.get("/builder/database/getTable", obj)},
    getViews() {return ajax.get("/builder/database/getViews", {})},
    getViewDefinition(obj) {return ajax.get("/builder/database/getViewDefinition", obj)},
    getFunctions() {return ajax.get("/builder/database/getFunctions", {})},
    getProcedures() {return ajax.get("/builder/database/getProcedures", {})},
    getFunctionDefinition(obj) {return ajax.get("/builder/database/getFunctionDefinition", obj)},
    getTriggers() {return ajax.get("/builder/database/getTriggers", {})},
    getTriggerDefinition(obj) {return ajax.get("/builder/database/getTriggerDefinition", obj)},
    executeTest(obj, query) {return ajax.post("/builder/sql/executeTest?"+joint.util.toQueryStr(query), obj)},
    getVersions() {return ajax.get("/builder/version/getVersions", {})},
    addVersion(obj) {return ajax.post("/builder/version/addVersion", obj)},
    modifyVersion(obj) {return ajax.post("/builder/version/modifyVersion", obj)},
    getVersion(obj) {return ajax.get("/builder/version/getVersion", obj)},
  };
}