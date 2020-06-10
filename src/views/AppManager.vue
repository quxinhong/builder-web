<template>
    <div class="body">
        <div style="display: flex; justify-content: space-between">
            <div>
                <el-form inline>
                    <el-form-item>
                        <el-input v-model="keyword" placeholder="名称/编码"></el-input>
                    </el-form-item>
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
            <el-table-column prop="appNo" label="app编码"></el-table-column>
            <el-table-column prop="appName" label="app名称"></el-table-column>
            <el-table-column prop="appShortName" label="app简称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
                <template slot-scope="scope">
                    <el-button @click="$refs.detail.open(scope.row.comNo)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <app-dialog ref="detail" @success="getList"></app-dialog>
    </div>
</template>

<script>
    import AppDialog from "../components/AppDialog";
    export default {
        name: "AppManager",
        components: {
            AppDialog
        },
        data() {
            return {
                keyword: null,
                list: []
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.$model.getApps({keyword: this.keyword}).then(res => {
                    this.list = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>