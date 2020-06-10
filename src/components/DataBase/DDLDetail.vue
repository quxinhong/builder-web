<template>
  <div class="body x">
    <div class="t">
      <codemirror ref="coder" v-model="form.script" :options="cmOptions"></codemirror>
    </div>
    <div class="b">
      <div class="oper">
        <div v-if="disabled">id: {{form.ddlId}}, 备注: {{form.remark}}</div>
        <div v-else style="width: 80%;">
          <span style="margin-right: 50px">DDL名称: <el-input v-model="form.ddlName" style="max-width: 150px;"></el-input></span>
          <span>备注: <el-input v-model="form.remark" style="max-width: 300px;"></el-input></span>
        </div>
        <div v-if="!disabled">
          <el-button @click.stop="executeSql" type="success">运行</el-button>
          <el-button @click.stop="save" type="primary">保存</el-button>
        </div>
      </div>
      <div class="bb">
        <el-tabs v-model="activeName">
          <el-tab-pane label="信息" name="info">
            <div style="height: 100%; overflow: auto">
              <p v-for="(item, index) in excuteInfo.excuteInfos" :key="index">{{item}}</p>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'result'+index" :name="'result'+index" v-for="(item, index) in excuteInfo.results" :key="index">
            <div style="height: 100%; overflow: auto">
              <table border cellspacing="0">
                <tr v-for="(row, rowNo) in item" :key="rowNo">
                  <td v-for="(col, cidx) in row" :key="cidx">
                    {{col}}
                  </td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  let form = {
    ddlId: null,
    ddlName: null,
    remark: null,
    script: ""
  }
  export default {
    name: "DDLDetail",
    props: {
      ddlId: {
        type: Number,
        required: true
      }
    },
    data(){
      return {
        form: {...form},
        waitSave: false,
        activeName: "info",
        excuteInfo: {
          excuteInfos: [],
          results: []
        }
      }
    },
    computed: {
      disabled(){
        let val = this.ddlId !== -1
        this.setReadOnly(val)
        return val
      }
    },
    watch: {
      dialogVisible(val){
        if(!val){
          this.reset()
        }
      },
      ddlId(val){
        this.getDetail(val)
      }
    },
    created() {
      this.getDetail(this.ddlId)
    },
    methods: {
      executeSql(){
        let obj = {
          script: this.form.script
        }
        this.$model.executeSql(obj).then(res=>{
          this.excuteInfo = res.data
        })
      },
      getDetail(ddlId){
        if(ddlId!==-1){
          this.$model.getDDL({ddlId}).then(res=>{
            this.form = res.data
          })
        }else{
          this.form = {...form}
        }
      },
      showDialog(){
        if(this.$util.isBlank(this.form.script)){
          this.$util.error("DDL脚本不能为空")
          return
        }
        if(this.form.ddlId!=-1){
          this.tempForm.ddlName = this.form.ddlName
          this.tempForm.remark = this.form.remark
        }
        this.dialogVisible = true
      },
      reset(){
        this.tempForm = {...form}
        this.$nextTick(()=>{
          this.$refs.form.clearValidate()
        })
      },
      setWaitSave(val){
        this.waitSave = val
        this.setReadOnly(!val)
      },
      save(){
        this.$confirm('DDL只能增量更新，一旦保存不可修改或删除。是否确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(!this.form.ddlName){
            this.$util.error("DDL名称不能为空")
            return
          }
          let obj = {
            ddlName: this.form.ddlName,
            remark: this.form.remark,
            script: this.form.script
          }
          this.$model.addDDL(obj).then(res=>{
            this.form = res.data
            this.$util.success("操作成功")
            this.$emit("success", res.data)
            this.setWaitSave(false)
          })
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped>
/deep/.el-tabs{
  height: 100%;
}
</style>