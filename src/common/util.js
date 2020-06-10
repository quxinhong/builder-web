import {Message} from "element-ui"
export default (Vue, joint) => {
    const isBlank = (obj) => {
        if(obj===undefined||obj===null||obj===""){
            return true
        }
        if(typeof obj === "string"){
            return obj.trim() === ""
        }
        if(typeof obj === "object"){
            if(Array.isArray(obj)){
                return obj.length === 0
            }else{
                return Object.keys.length === 0
            }
        }
        return false
    }
    const isEmpty = (obj) => {
        return obj===undefined||obj===null||obj===""
    }
    const toQueryStr = (obj) => {
        if(Object.keys(obj).length){
            let arr = []
            for(let key in obj){
                if(obj[key]!==null){
                    arr.push(key+"="+encodeURIComponent(obj[key]))
                }
            }
            return arr.join("&")
        }
        return ""
    }
    const error = msg => {Message.error(msg)}
    const success = msg => {Message.success(msg)}
    const warning = msg => {Message.warning(msg)}
    const util =  Vue.prototype.$util = joint.util = {
        isBlank, isEmpty, toQueryStr, error, success, warning
    }
    return util
}