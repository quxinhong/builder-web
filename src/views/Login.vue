<template>
    <div class="body">
        <el-card style="width: 300px">
            <el-form label-position="left" label-width="80px" :model="form">
                <el-form-item label="账号">
                    <el-input v-model="form.userNo" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                form: {
                    userNo: null,
                    password: null
                }
            }
        },
        methods: {
            login(){
                this.$model.login(this.form).then(()=>{
                    this.$store.commit("LOGIN", true)
                })
            }
        }
    }
</script>

<style scoped>
.body{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>