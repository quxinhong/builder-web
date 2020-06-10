<template>
  <el-tabs style="height: 100%">
    <el-tab-pane label="DDL" lazy>
      <d-d-l></d-d-l>
    </el-tab-pane>
    <el-tab-pane label="表格" lazy>
      <tables></tables>
    </el-tab-pane>
    <el-tab-pane label="视图" lazy>
      <others type="view"></others>
    </el-tab-pane>
    <el-tab-pane label="函数" lazy>
      <others type="function"></others>
    </el-tab-pane>
    <el-tab-pane label="存储过程" lazy>
      <others type="procedure"></others>
    </el-tab-pane>
    <el-tab-pane label="触发器" lazy>
      <others type="trigger"></others>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import DDL from "../components/DataBase/DDL";
  import Tables from "../components/DataBase/Tables";
  import Others from "../components/DataBase/Others";
  export default {
    name: "DataBase",
    components: {
      DDL, Tables, Others
    }
  };
</script>

<style scoped>

</style>