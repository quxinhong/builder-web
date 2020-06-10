<template>
  <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="1000px"
          :close-on-press-escape="false"
          :close-on-click-modal="false">
    <div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="Api编码" prop="apiNo">
              <el-input v-model="form.apiNo" :disabled="operType!=='add'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Api名称" prop="apiName">
              <el-input v-model="form.apiName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Api类型" prop="apiType">
              <j-common com-no="apiType" v-model="form.apiType"></j-common>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="首页查询" prop="home">
              <el-checkbox v-model="form.home"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="save">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
  let form = {
    apiNo: null,
    moduleNo: null,
    apiName: null,
    apiType: null,
    remark: null,
    home: false,
    inJson: null,
    outJson: null
  }
  export default {
    name: "ApiDialog",
    data(){
      return {
        form: {...form},
        dialogVisible: false,
        operType: "add",
        rules: {
          apiNo: [{validator: this.makeNotEmpty("Api编码不能为空")}],
          apiName: [{validator: this.makeNotEmpty("Api名称不能为空")}],
          apiType: [{validator: this.makeNotEmpty("Api类型不能为空")}]
        }
      }
    },
    computed: {
      title(){
        let obj = {
          add: "新建Api",
          edit: "修改Api"
        }
        return obj[this.operType]
      }
    },
    watch: {
      dialogVisible(val){
        if(!val){
          this.reset()
        }
      }
    },
    methods: {
      open(obj){
        this.form = {...this.form, ...obj}
        if(obj.apiNo){
          this.operType = "edit"
        }
        this.dialogVisible = true
      },
      reset(){
        this.form = {...form}
        this.$refs.form.clearValidate()
      },
      save(){
        this.validate(this.$refs.form).then(()=>{
          let fn = this.operType === "add" ? this.$model.addApi : this.$model.modifyApi
          fn(this.form).then(()=>{
            this.$util.success("操作成功")
            this.$emit("success")
            this.dialogVisible = false
          })
        })
      }
    }
  };
</script>

<style scoped>

</style>