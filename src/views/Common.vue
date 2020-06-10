<template>
  <div class="body">
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-form inline>
          <el-form-item>
            <el-input v-model="keyword" placeholder="名称/编码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="getCommonList" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="$refs.detail.open()">新建</el-button>
      </div>
    </div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="comNo" label="编码"></el-table-column>
      <el-table-column prop="comName" label="名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="$refs.detail.open(scope.row.comNo)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <common-dialog ref="detail" @success="getCommonList"></common-dialog>
  </div>
</template>

<script>
  import CommonDialog from "../components/CommonDialog";
  export default {
    name: "Common",
    components: {
      CommonDialog
    },
    data(){
      return {
        keyword: null,
        list: []
      }
    },
    created(){
      this.getCommonList()
    },
    methods: {
      getCommonList(){
        this.$model.commonList({keyword: this.keyword}).then(res=>{
          this.list = res.data
        })
      }
    }
  };
</script>

<style scoped>

</style>