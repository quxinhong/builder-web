<template>
  <div class="body">
    <div class="t">
      <j-top @goWhere="goWhere"></j-top>
    </div>
    <div class="b">
      <div class="l">
        <j-left @goWhere="goWhere"></j-left>
      </div>
      <div class="r">
        <j-main ref="main"></j-main>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Left from "./Left";
import Main from "./Main"
import Top from "./Top"
export default {
  name: 'Home',
  components: {
    JLeft: Left,
    JMain: Main,
    JTop: Top
  },
  data(){
    return {
      form: {
        userNo: null,
        password: null
      }
    }
  },
  methods: {
    goWhere(page){
      this.$refs.main.addPage(page)
    }
  }
}
</script>
<style scoped lang="less">
  .body{
    .t{
      height: 27px;
      border-bottom: 1px solid #000;
      background: #3C3F41
    }
    .b{
      height: calc(100% - 27px);
      display: flex;
    }
    .l{
      height: 100%;
      width: 150px;
      display: inline-block;
      border-right: 1px solid #000;
      background: #3C3F41
    }
    .r{
      height: 100%;
      width: calc(100% - 150px);
      display: inline-block
    }
  }
</style>