<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="1000px"
            :close-on-press-escape="false"
            :close-on-click-modal="false">
        <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left" :disabled="operType==='detail'">
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-form-item label="app编码" prop="appNo">
                            <el-input v-model="form.appNo" :disabled="operType!=='add'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="app名称" prop="appName">
                            <el-input v-model="form.appName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="app简称" prop="appShortName">
                            <el-input v-model="form.appShortName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <template slot="footer">
            <el-button type="primary" @click="operType='edit'" v-if="operType==='detail'">修 改</el-button>
            <el-button type="primary" @click="cancelEdit" v-if="operType==='edit'">取 消</el-button>
            <el-button type="primary" @click="save" v-if="operType!='detail'">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script>
    let form = {
        appNo: null,
        appName: null,
        appShortName: null,
        remark: null
    }
    export default {
        name: "AppDialog",
        data(){
            return {
                dialogVisible: false,
                form: {...form},
                rules: {},
                operType: "add"
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
                    add: "新建通用参数",
                    detail: "通用参数详情",
                    edit: "修改通用参数"
                }
                return obj[this.operType]
            }
        },
        methods: {
            reset(){
                this.form = {...form}
                this.$nextTick(()=>{
                    this.$refs.form.clearValidate()
                })
            },
            open(appNo){
                this.dialogVisible = true
               if(appNo){
                   this.operType = "detail"
               } else{
                   this.operType = "add"
               }
            },
            getDetail(pk){
                this.$model.getApp({appNo: pk}).then(res=>{
                    this.form = res.data
                })
            },
            cancelEdit(){
                this.getDetail(this.form.appNo)
                this.operType='detail'
            },
            save(){
                this.validate(this.$refs.form).then(()=>{
                    let fn = this.operType === "add" ? this.$model.addApp : this.$model.modifyApp
                    fn(this.form).then(()=>{
                        this.$util.success("操作成功")
                        this.cancelEdit()
                        this.$emit("success")
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>