import {Loading} from "element-ui"

export default (joint) => {
  const statusHandle = (xhr) => {
    joint.util.error(xhr.statusText)
    switch (xhr.status) {
      case 401:
        joint.store.commit("LOGIN", false)
        break
      default:

    }
  }
    let num = 0
    const request = (method, url, data, option={}) => {
        num++
        let loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)'
        })
        let async = false===option.async?false:true
        return new Promise(resolve => {
            method = method.toUpperCase()
            let xhr = new XMLHttpRequest();
            xhr.responseType = "json"
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    num--
                    if(xhr.status == 200 || xhr.status == 304){
                        if(xhr.response.code===0){
                            resolve(xhr.response)
                        }else{
                          if(option.error){
                            option.error(xhr.response)
                          }else{
                            joint.util.error(xhr.response.msg||"未知异常")
                          }
                        }
                    }else{
                      statusHandle(xhr)
                    }
                    if(num<=0){
                        loadingInstance.close()
                    }
                }
            }
            let param = null
            let contentType = "application/json"
            if(method==="GET"){
              let queryStr = joint.util.toQueryStr(data)
              if(queryStr){
                url = url+"?"+queryStr
              }
                contentType = "application/x-www-form-urlencoded"
            }else{
                let obj = {}
                for(let key in data){
                    if(data[key]!=null){
                        obj[key] = data[key]
                    }
                }
                param = JSON.stringify(obj)
            }
            xhr.open(method, url, async)
            xhr.setRequestHeader("content-type", contentType)
            xhr.send(param)
        })
    }
    const get = (url, data, option) => {
        return request("GET", url, data, option)
    }
    const post = (url, data, option) => {
        return request("POST", url, data, option)
    }
    let http = joint.http = {
        get,
        post
    }
    return http
}