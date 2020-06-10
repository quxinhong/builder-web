<template>
  <div class="body others">
    <div class="body l">
      <div>
        <el-input class="no-border" prefix-icon="el-icon-search" v-model="keyword" @input="search" placeholder="关键字过滤">
          <el-button type="text" slot="append" @click="refresh">刷新</el-button>
        </el-input>
      </div>
      <div class="ul">
        <div :class="{li: true, selected: item===current}" @click="switchTo(item)" v-for="(item, index) in showList"
             :key="index">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="body r">
      <codemirror ref="coder" v-model="detail" :options="cmOptions"></codemirror>
    </div>
  </div>
</template>

<script>
  let obj = {
    view: {
      list: "getViews",
      detail: "getViewDefinition",
      key: "view"
    },
    function: {
      list: "getFunctions",
      detail: "getFunctionDefinition",
      key: "function"
    },
    procedure: {
      list: "getProcedures",
      detail: "getFunctionDefinition",
      key: "function"
    },
    trigger: {
      list: "getTriggers",
      detail: "getTriggerDefinition",
      key: "trigger"
    }
  }
  export default {
    name: "Others",
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        keyword: null,
        list: [],
        current: null,
        detail: "",
        timer: null,
        searchStr: null
      };
    },
    created(){
      this.getList()
    },
    computed: {
      showList(){
        if(this.searchStr){
          return this.list.filter(it=>{
            return it.indexOf(this.searchStr) != -1
          })
        }
        return this.list
      }
    },
    methods: {
      search(val){
        let self = this
        if(this.timer!=null){
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
          self.searchStr = val
        }, 500)
      },
      refresh(){
        this.keyword = null
        this.searchStr = null
        this.getList()
        if(this.current){
          this.getDetail(this.current)
        }
      },
      switchTo(item){
        if(this.current!==item){
          this.current = item
          this.getDetail(item)
        }
      },
      getList(){
        this.$model[obj[this.type].list]().then(res=>{
          this.list = res.data
        })
      },
      getDetail(value){
        let param = {}
        param[obj[this.type].key] = value
        this.$model[obj[this.type].detail](param).then(res=>{
          this.detail = res.data
        })
      }
    }
  };
</script>

<style scoped lang="less">
  .others {
    display: flex;
    .l {
      width: 150px;
      background-color: #3C3F41;
      .ul {
        height: calc(100% - 28px);
        overflow: auto;
        .li.selected {
          background-color: var(--blue);
        }
        .li:hover {
          cursor: pointer;
        }
      }
    }
    .r {
      width: calc(100% - 150px);
    }
  }
</style>