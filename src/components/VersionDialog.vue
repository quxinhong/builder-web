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
          <el-col :span="6">
            <el-form-item label="版本id" prop="versionId">
              <el-input v-model="form.versionId" readonly placeholder="保存后可见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="ddlId" prop="ddlId">
              <el-input v-model="form.ddlId" readonly placeholder="保存后可见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版本编码" prop="versionNo">
              <el-input v-model="form.versionNo" :readonly="operType!=='add'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否有效" prop="usable">
              <el-checkbox v-model="form.usable" :disabled="operType==='detail'"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" :readonly="operType==='detail'"></el-input>
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
  const form = {
    versionId: null,
    ddlId: null,
    versionNo: null,
    remark: null,
    usable: true
  };
  export default {
    name: "VersionDialog",
    data(){
      return {
        form: { ...form },
        rules: {
          versionNo: [{ validator: this.makeNotEmpty("版本编码不能为空") }]
        },
        dialogVisible: false,
        operType: "add"
      };
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          this.reset();
        }
      }
    },
    computed: {
      title() {
        let obj = {
          add: "新建版本",
          detail: "版本详情",
          edit: "修改版本"
        };
        return obj[this.operType];
      }
    },
    methods: {
      cancelEdit() {
        this.getDetail(this.form.versionId);
        this.operType = "detail";
      },
      open(versionId) {
        this.dialogVisible = true;
        if (versionId) {
          this.operType = "detail";
          this.getDetail(versionId)
        } else {
          this.operType = "add";
        }
      },
      getDetail(versionId) {
        this.$model.getVersion({ versionId }).then(res => {
          this.form = res.data;
        });
      },
      reset() {
        this.form = { ...form };
        this.$refs.form.clearValidate();
      },
      save() {
        this.validate(this.$refs.form).then(() => {
          let fn = this.operType === "add" ? this.$model.addVersion : this.$model.modifyVersion;
          fn(this.form).then((res) => {
            this.$util.success("操作成功");
            this.form = res.data
            this.operType = "detail";
            this.$emit("success");
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>