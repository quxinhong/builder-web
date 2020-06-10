<template>
  <div class="body x">
    <div class="t">
      <codemirror ref="coder" v-model="form.script" :options="cmOptions" @inputRead="test"></codemirror>
    </div>
    <div class="b">
      <div class="oper">
        <div>
          批量：<el-checkbox v-model="form.batch" :disabled="operType==='detail'"></el-checkbox>
          备注：<el-input v-model="form.remark" style="width: 400px" :disabled="operType==='detail'"></el-input>
        </div>
        <div>
          <el-button @click="delStep" v-if="operType==='detail'" type="primary">删除</el-button>
          <el-button @click="executeSql" type="success">运行</el-button>
          <el-button @click="setOperType('edit')" v-if="operType==='detail'">编辑</el-button>
          <el-button type="primary" @click="save" v-if="operType!='detail'">保存</el-button>
        </div>
      </div>
      <div class="dd">
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
    moduleNo: null,
    apiNo: null,
    stepNo: null,
    idx: -1,
    script: "",
    batch: false,
    remark: null
  }
  export default {
    name: "Step",
    data() {
      return {
        form: {...form},
        operType: "add",
        activeName: "info",
        excuteInfo: {
          excuteInfos: [],
          results: []
        }
      }
    },
    methods: {
      test(e){
        console.log(e)
      },
      executeSql(){
        let obj = {
          script: this.form.script
        }
        this.$model.executeSql(obj).then(res=>{
          this.excuteInfo = res.data
        })
      },
      setStep(step){
        this.form = {...form, ...step}
        if(step.stepNo){
          this.setOperType("detail")
        }else{
          this.setOperType("add")
        }
      },
      setOperType(type){
        this.operType = type
        if(type==="detail"){
          this.setReadOnly(true)
        }else{
          this.setReadOnly(false)
        }
      },
      save(){
        let fn = this.operType==="add"?this.$model.addStep:this.$model.modifyStep
        fn(this.form).then((res)=>{
          this.setOperType("detail")
          this.$util.success("操作成功")
          this.$emit("success", res.data)
        })
      },
      delStep(){
        this.confirm("确定删除当前脚本？").then(()=>{
          this.$model.delStep({moduleNo: this.form.moduleNo, apiNo: this.form.apiNo, idx: this.form.idx}).then(()=>{
            this.$util.success("操作成功")
            this.$emit("deleted", this.form.idx)
          })
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>