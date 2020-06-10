<template>
  <div class="body tables">
    <div class="body l">
      <div>
        <el-input class="no-border" prefix-icon="el-icon-search" v-model="keyword" @input="search" placeholder="关键字过滤">
          <el-button type="text" slot="append" @click="refresh">刷新</el-button>
        </el-input>
      </div>
      <div class="ul">
        <div :class="{li: true, selected: item.TABLE_NAME===current}" @click="switchTo(item)" v-for="(item, index) in showList"
             :key="index">
          <span>{{item.TABLE_NAME}}({{item.TABLE_TYPE==='VIEW'?'V':'T'}})</span>
        </div>
      </div>
    </div>
    <div class="body r">
      <table v-if="detail" border cellspacing="0">
        <tr v-for="(row, rowNo) in detail" :key="rowNo">
          <td v-for="(col, cidx) in row" :key="cidx">{{col}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tables",
    data() {
      return {
        keyword: null,
        list: [],
        current: null,
        detail: null,
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
        if(this.current!==item.TABLE_NAME){
          this.current = item.TABLE_NAME
          this.getDetail(item.TABLE_NAME)
        }
      },
      getList(){
        this.$model.getTables().then(res=>{
          this.list = res.data
        })
      },
      getDetail(table){
        this.$model.getTable({table}).then(res=>{
          this.detail = res.data
        })
      }
    }
  };
</script>

<style scoped lang="less">
  .tables {
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