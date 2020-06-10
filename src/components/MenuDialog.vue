<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="1000px">
    <div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left" :disabled="operType==='detail'">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="父级菜单" prop="parentId">
              <el-input :value="parent.menuName||form.parentId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="模块编码" prop="moduleNo">
              <el-input v-model="form.moduleNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  let form = {
    menuId: null,
    parentId: null,
    menuName: null,
    moduleNo: null,
    track: null,
    remark: null,
    orderNum: null,
    icon: null
  }
  export default {
    name: "MenuDialog",
    props: {

    },
    data(){
      return {
        dialogVisible: false,
        form: {...form},
        rules: {
          menuName: [{validator: this.makeNotEmpty("菜单名称不能为空")}]
        },
        operType: "add",
        parent: {}
      }
    },
    watch: {
      dialogVisible(val){
        if(!val){
          this.reset()
        }
      }
    },
    computed: {
      title(){
        let obj = {
          add: "新建菜单",
          edit: "修改菜单"
        }
        return obj[this.operType]
      }
    },
    methods: {
      open({menuId, parentId}){
        this.dialogVisible = true
        if(menuId){
          this.operType = "edit"
          this.getMenu(menuId).then(res=>{
            this.form = {...res.data}
            if(this.form.parentId){
              this.getMenu(this.form.parentId).then(res=>{
                this.parent = {...res.data}
              })
            }
          })
        }else{
          this.form.parentId = parentId||0
          this.operType = "add"
          if(this.form.parentId){
            this.getMenu(this.form.parentId).then(res=>{
              this.parent = {...res.data}
            })
          }
        }
      },
      reset(){
        this.form = {...form}
        this.parent = {}
        this.$nextTick(()=>{
          this.$refs.form.clearValidate()
        })
      },
      getMenu(menuId){
        let getMenu = this.$model.getMenu
        return new Promise(resolve => {
          getMenu({menuId}).then(res=>{
            resolve(res)
          })
        })
      },
      save(){
        this.validate(this.$refs.form).then(()=>{
          this.$model.saveMenu(this.form).then(()=>{
            this.$util.success("操作成功")
            this.dialogVisible = false
            this.$emit("success")
          })
        })
      }
    }
  };
</script>

<style scoped>

</style>