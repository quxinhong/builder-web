<template>
  <div class="body doc">
    <div class="l">
      <codemirror ref="coder" :value="json" :options="jsonOptions"></codemirror>
    </div>
    <div class="r">
      <el-form ref="params" :model="form" label-position="left">
        <el-table :data="form.params" style="width: 100%" border>
          <el-table-column prop="fieldName" label="字段名" align="center"></el-table-column>
          <el-table-column label="label" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'params.'+scope.$index+'.fieldLabel'" :rules="rules.fieldLabel">
                <el-input v-model="scope.row.fieldLabel" :readonly="disabled"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="'params.'+scope.$index+'.fieldType'" :rules="rules.fieldType">
                <el-input v-model="scope.row.fieldType" :readonly="disabled"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="默认值" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.defaultValue" :readonly="disabled"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="举例" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.example" :readonly="disabled"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="可为空" width="60px" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-checkbox v-model="scope.row.nullable" :disabled="disabled"></el-checkbox>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="更多.." width="60px" align="center" type="expand">
            <template slot-scope="scope">
              <el-row :gutter="30">
                <el-col :span="8">
                  <el-form-item label="正则验证" label-width="100px">
                    <el-input v-model="scope.row.regExp" :readonly="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合计行算法" label-width="100px">
                    <div style="display: flex">
                      <el-select v-model="scope.row.totalMethod" placeholder="请选择" :disabled="disabled" style="width: 70%">
                        <el-option label="COUNT" value="COUNT"></el-option>
                        <el-option label="SUM" value="SUM"></el-option>
                      </el-select>
                      -
                      <el-input v-model="scope.row.unit" :readonly="disabled" placeholder="单位" style="width: 30%"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="查询接口" label-width="100px">
                    <div style="display: flex">
                      <el-input v-model="scope.row.queryModuleNo" :readonly="disabled" placeholder="moduleNo"></el-input>-
                      <el-input v-model="scope.row.queryApiNo" :readonly="disabled" placeholder="apiNo"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="通用参数编码" label-width="100px">
                    <el-input v-model="scope.row.comNo" :readonly="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="高亮设置" label-width="100px">
                    <el-input v-model="scope.row.highlightCollor" :readonly="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="可点击" label-width="100px">
                    <el-checkbox v-model="scope.row.clickEvent" :disabled="disabled"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="隐藏" label-width="100px">
                    <el-checkbox v-model="scope.row.hidden" :disabled="disabled"></el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div style="text-align: right; border-top: 1px solid; padding: 5px">
        <el-button @click="generateDictionarys" v-if="this.disabled">生成文档</el-button>
        <el-button @click="edit" v-if="this.disabled">修改</el-button>
        <el-button @click="cancel" v-if="!this.disabled">取消</el-button>
        <el-button @click="save" v-if="!this.disabled">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  let dic = {
    moduleNo: null,
    apiNo: null,
    fieldName: null,
    inOut: null,
    fieldLabel: null,
    fieldType: null,
    regExp: null,
    totalMethod: null,
    unit: null,
    queryModuleNo: null,
    queryApiNo: null,
    comNo: null,
    highlightCollor: null,
    clickEvent: false,
    defaultValue: null,
    example: null,
    hidden: false,
    nullable: false
  }
  export default {
    name: "DocDetail",
    props: {
      Api: {
        Type: Object,
        required: true
      },
      inOut: {
        Type: String,
        required: true
      }
    },
    data(){
      return {
        form: {
          params: [],
        },
        rules: {
          fieldLabel: [{validator: this.makeNotBlank("label不能为空")}],
          fieldType: [{validator: this.makeNotBlank("类型不能为空")}],
        },
        disabled: true
      }
    },
    computed: {
      json(){
        return this.inOut==="in"?this.Api.inJson:this.Api.outJson
      }
    },
    created() {
      this.getDictionarys();
    },
    methods: {
      edit(){
        this.disabled = false
      },
      cancel(){
        this.disabled = true
        this.getDictionarys();
      },
      generateDictionarys(){
        let param = {
          moduleNo: this.Api.moduleNo,
          apiNo: this.Api.apiNo
        }
        let fn = this.inOut==="in"?this.$model.generateInDictionarys:this.$model.generateOutDictionarys
        fn(param).then(res=>{
          this.disabled = false
          this.form.params = res.data.map(it=>{
            for(let key in dic){
              if(it[key]===undefined||it[key]===null){
                it[key] = dic[key]
              }
            }
            it.inOut = this.inOut
            return it;
          })
          this.$nextTick(()=>{
            this.$refs.params.clearValidate()
          })
        })
      },
      save(){
        this.validate(this.$refs.params).then(()=>{
          let param = {
            api: this.Api,
            dictionarys: this.form.params
          }
          this.$model.saveDictionarys(this.inOut, param).then(()=>{
            this.$emit("success")
            this.$util.success("操作成功")
            this.disabled = true
          })
        })
      },
      getDictionarys(){
        this.$model.getDictionarys({moduleNo: this.Api.moduleNo, apiNo: this.Api.apiNo, inOut: this.inOut}).then(res=>{
          this.form.params = res.data
        })
      }
    }
  }
</script>

<style scoped>
  .doc{
    display: flex;
    height: 100%;
  }
  .doc .l{
    width: 30%;
    border-right: 1px solid;
  }
  .doc .r{
    width: 70%;
  }
</style>