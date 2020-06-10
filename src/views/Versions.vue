<template>
  <div class="body">
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-form inline>
          <el-form-item>
            <el-button @click="getList" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button @click="$refs.detail.open()">新建</el-button>
      </div>
    </div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="versionId" label="版本id"></el-table-column>
      <el-table-column prop="ddlId" label="ddlId"></el-table-column>
      <el-table-column prop="versionNo" label="版本编码"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="usable" label="是否有效">
        <template slot-scope="scope">
          {{scope.row.usable?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button @click="$refs.detail.open(scope.row.versionId)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <version-dialog ref="detail" @success="getList"></version-dialog>
  </div>
</template>

<script>
  import VersionDialog from "../components/VersionDialog";
  export default {
    name: "Versions",
    components: {
      VersionDialog
    },
    data(){
      return {
        list: []
      }
    },
    created(){
      this.getList()
    },
    methods: {
      getList(){
        this.$model.getVersions().then(res=>{
          this.list = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>