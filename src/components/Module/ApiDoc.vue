<template>
  <div class="body">
    <el-tabs v-model="activeName">
      <el-tab-pane label="输入" name="in" lazy>
        <doc-detail :api="api" in-out="in" @success="$emit('success')"></doc-detail>
      </el-tab-pane>
      <el-tab-pane label="输出" name="out" lazy>
        <doc-detail :api="api" in-out="out" @success="$emit('success')"></doc-detail>
      </el-tab-pane>
      <el-tab-pane label="测试" name="test" lazy>
        <api-test :api="api"></api-test>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DocDetail from "./DocDetail";
  import ApiTest from "./ApiTest"
  export default {
    name: "ApiDoc",
    components: {
      DocDetail,
      ApiTest
    },
    props: {
      api: {
        Type: Object,
        required: true
      }
    },
    data(){
      return {
        activeName: "in",
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
/deep/.el-tabs{
  height: 100%;
}
</style>