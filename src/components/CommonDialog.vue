<template>
  <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="1200px"
          :close-on-press-escape="false"
          :close-on-click-modal="false">
    <div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="编码" prop="comNo">
              <el-input v-model="form.comNo" :readonly="operType!=='add'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" prop="comName">
              <el-input v-model="form.comName" :readonly="operType==='detail'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" :readonly="operType==='detail'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <item-title>
        项目列表
        <el-button
            @click="addItem"
            style="float: right"
            slot="right"
            :disabled="operType==='detail'">
          增加+
        </el-button>
      </item-title>
      <el-form :model="itemForm" ref="items">
        <el-table :data="itemForm.items" style="width: 100%">
          <el-table-column label="label" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'items.'+scope.$index+'.label'" :rules="itemRules.label">
                <el-input v-model="scope.row.label" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="值" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'items.'+scope.$index+'.value'" :rules="itemRules.value">
                <el-input v-model="scope.row.value" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="颜色" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.color" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="关联信息" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.bind" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.idx" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="55" type="expand">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.remark" :readonly="operType==='detail'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="55">
            <template slot-scope="scope">
              <el-button type="text" @click="delItem(scope.$index)" :disabled="operType==='detail'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="operType='edit'" v-if="operType==='detail'&&form.editable">修 改</el-button>
      <el-button type="primary" @click="cancelEdit" v-if="operType==='edit'">取 消</el-button>
      <el-button type="primary" @click="save" v-if="operType!='detail'">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
  const form = {
    comNo: null,
    comName: null,
    remark: null,
    editable: true
  };
  const item = {
    value: null,
    label: null,
    idx: null,
    color: null,
    bind: null,
    remark: null
  };
  export default {
    name: "CommonDetail",
    props: {},
    data() {
      return {
        form: { ...form },
        itemForm: {
          items: [],
        },
        rules: {
          comNo: [{ validator: this.makeNotEmpty("通用资料编码不能为空") }],
          comName: [{ validator: this.makeNotEmpty("通用资料名称不能为空") }]
        },
        itemRules: {
          value: [{ validator: this.makeNotEmpty("通用资料值不能为空") }],
          label: [{ validator: this.makeNotEmpty("通用资料label不能为空") }]
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
          add: "新建通用资料",
          detail: "通用资料详情",
          edit: "修改通用资料"
        };
        return obj[this.operType];
      }
    },
    methods: {
      cancelEdit() {
        this.getDetail(this.form.comNo);
        this.operType = "detail";
      },
      open(comNo) {
        this.dialogVisible = true;
        if (comNo) {
          this.form.comNo = comNo;
          this.operType = "detail";
          this.getDetail(comNo);
        } else {
          this.operType = "add";
          this.addItem();
        }
        this.$nextTick(()=>{
          this.$refs.form.clearValidate();
        })
      },
      getDetail(comNo) {
        this.$model.getCommon({ comNo }).then(res => {
          this.form = res.data;
          this.itemForm.items = res.items.sort((a, b)=>{return a.idx - b.idx});
        });
      },
      reset() {
        this.form = { ...form };
        this.itemForm.items = [];
      },
      addItem() {
        this.itemForm.items.push({ ...item });
      },
      delItem(index) {
        this.confirm("是否确认删除？").then(() => {
          this.itemForm.items.splice(index, 1);
        }).catch(() => {
        });
      },
      save() {
        let forms = [this.$refs.form, this.$refs.items];
        this.validateBatch(forms).then(() => {
          let param = {
            common: this.form,
            items: this.itemForm.items
          };
          let fn = this.operType === "add" ? this.$model.addCommon : this.$model.modifyCommon;
          fn(param).then(() => {
            this.$util.success("操作成功");
            this.cancelEdit();
            this.$emit("success");
          });
        });
      }
    }
  };
</script>

<style scoped>

</style>