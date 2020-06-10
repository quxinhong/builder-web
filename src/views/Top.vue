<template>
  <div class="body">
    <div class="t1">
      <el-button-group>
        <el-button @click="goWhere(toCommon())">通用资料</el-button>
        <el-button @click="goWhere(toAppManager())">应用管理</el-button>
        <el-button @click="goWhere(toDataBase())">数据库管理</el-button>
        <el-button @click="goWhere(toVersions())">版本管理</el-button>
        <el-button @click="test">test</el-button>
      </el-button-group>
      <el-button style="border: none;" @click="drawVisible = true">帮助<i class="el-icon-question"></i></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Top",
    data(){
      return {
        drawVisible: false
      }
    },
    methods: {
      test(){
        console.log(this.$store)
        this.$store.dispatch("test", "test").then(res=>{
          console.log(res)
        })
      },
      toCommon(){
        return {
          is: "j-common",
          name: "common",
          label: "通用参数",
          bind: {}
        }
      },
      toAppManager(){
        return {
          is: "j-app-manager",
          name: "appManager",
          label: "app管理",
          bind: {}
        }
      },
      toDataBase(){
        return {
          is: "j-data-base",
          name: "dataBase",
          label: "数据库管理",
          bind: {}
        }
      },
      toVersions(){
        return {
          is: "j-versions",
          name: "versions",
          label: "版本管理",
          bind: {}
        }
      },
      goWhere(component){
        this.$emit("goWhere", component)
      }
    }
  };
</script>

<style scoped lang="less">
  /deep/.el-button-group .el-button{
    border: none;
  }
  .t1{
    background: #505050;
    display: flex;
    justify-content: space-between;
  }

</style>