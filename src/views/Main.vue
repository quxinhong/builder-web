<template>
  <div class="body main">
    <el-tabs v-model="activeName" type="card" class="pages" closable @tab-remove="removePage">
      <el-tab-pane :label="page.label" :name="page.name" v-for="(page, index) in pages" :key="index">
        <component :is="page.is" v-bind="page.bind"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Common from "./Common"
  export default {
    name: "Main",
    components: {
      JCommon: Common
    },
    data(){
      return {
        activeName: null,
        pages: [],
        currentPage: {}
      }
    },
    methods: {
      addPage(page){
        if(!this.pages.some(it=>{return it.name===page.name})){
          this.pages.push(page)
        }
        this.currentPage = page
        this.activeName = page.name
      },
      removePage(name){
        for(let i=0; i<this.pages.length; i++){
          if(this.pages[i].name === name){
            if(this.activeName === name){
              let next = {}
              if(this.pages.length>1){
                if(i===this.pages.length-1){
                  next = this.pages[i-1]
                }else{
                  next = this.pages[i+1]
                }
              }
              this.currentPage = next
              this.activeName = next.name
            }
            this.pages.splice(i, 1)
            break
          }
        }
      }
    }
  };
</script>

<style scoped lang="less">
.main{
  /deep/.pages .el-tabs__item{
    height: unset;
    line-height: unset;
  }
  /deep/.pages.el-tabs--card > .el-tabs__header .el-tabs__nav{
    border-top: unset;
    border-color: #000;
    border-left: unset;
  }
  /deep/.pages.el-tabs--card > .el-tabs__header {
    height: 27px;
    border-color: #000;
  }
  /deep/.pages.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom: unset;
  }
  /deep/.el-tabs__nav-next, .el-tabs__nav-prev {
    line-height: unset;
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
    border-color: #000;
    background: #505050;
    height: 26px;
    line-height: 26px;
    border-bottom: unset;
  }
  .pages{
    height: 100%;
    /deep/.el-tabs__header{
      margin: 0;
    }
    /deep/.el-tabs__content{
      height: calc(100% - 27px);
      .el-tab-pane{
        height: 100%;
      }
    }
  }
}
</style>