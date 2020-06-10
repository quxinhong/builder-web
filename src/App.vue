<template>
  <div id="app">
    <home v-if="isLogin"></home>
    <login v-else></login>
  </div>
</template>
<script>
  import Login from "./views/Login";
  import Home from "./views/Home";
  export default {
    components: {
      Login,
      Home
    },
    computed: {
      isLogin(){
        return this.$store.getters.isLogin
      }
    }
  }
</script>
<style lang="less">
  html{
    color: #FFFFFF;
    background-color: #2b2b2b;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 26px;
    .wait-save:before{
      content: "*";
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgba(255,255,255,0.5);
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.5);
    }
    body{
      height: 100%;
      margin: 0;
      padding: 0;
      /deep/.vue-codemirror{
        height: 100%;
        font-size: 18px;
        .CodeMirror{
          background-color: unset;
          height: 100%;
        }
      }
      /deep/.el-dialog__footer{
        text-align: center;
      }
      /deep/.el-loading-mask.is-fullscreen{
        z-index: 99999999!important;
      }
      /deep/.no-border {
        border: none;
        .el-input-group__append, .el-input-group__prepend, .el-input__inner{
          border: none;
        }
      }
      div{
        box-sizing: border-box;
      }
      .body{
        height: 100%;
      }
      #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
      }
    }
  }

</style>
