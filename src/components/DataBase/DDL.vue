<template>
  <div class="body ddl">
    <div class="body l">
      <div>
        <el-input class="no-border" prefix-icon="el-icon-search" v-model="keyword" placeholder="关键字过滤">
          <el-button type="text" slot="append" @click="newDDL">新建</el-button>
        </el-input>
      </div>
      <div class="ul">
        <div :class="{li: true, selected: item.ddlId===currentId}" @click="switchTo(item)" v-for="(item, index) in list" :key="index">
          <span>{{item.ddlName}}({{item.ddlId}})</span>
        </div>
      </div>
    </div>
    <div class="body r">
      <ddl-detail v-if="currentId!==-2" :ddl-id="currentId" @success="AddSuccess"></ddl-detail>
    </div>
  </div>
</template>

<script>
  import DDLDetail from "./DDLDetail";
  export default {
    name: "DDL",
    components: {
      DdlDetail: DDLDetail
    },
    data() {
      return {
        keyword: null,
        list: [],
        currentId: -2
      };
    },
    created() {
      this.getList()
    },
    methods: {
      switchTo(item){
        this.currentId = item.ddlId
      },
      getList(){
        this.$model.getDDLIdxs().then(res=>{
          this.list = res.data.reverse()
        })
      },
      newDDL(){
        let item = {
          ddlName: "新的DDL",
          ddlId: -1,
          remark: null,
          script: ""
        }
        this.list.unshift(item);
        this.currentId = item.ddlId
      },
      AddSuccess(ddl){
        this.list.splice(0, 1)
        this.list.unshift(ddl)
        this.currentId = ddl.ddlId
      }
    }
  };
</script>

<style scoped lang="less">
  .ddl {
    display: flex;
    .l {
      width: 150px;
      background-color: #3C3F41;
      .ul {
        height: calc(100% - 28px);
        overflow: auto;
        .li.selected{
          background-color: var(--blue);
        }
        .li:hover{
          cursor: pointer;
        }
      }
    }
    .r {
      width: calc(100% - 150px);
    }
  }
</style>