<template>
  <div class="body module">
    <div class="body l">
      <div style="display: flex; justify-content: space-between">
        <span>NO.{{moduleNo}}</span>
        <el-button slot="append" @click="newApi" style="border: none">新建</el-button>
      </div>
      <div class="ul">
        <el-collapse v-model="activeName" accordion @change="handleChange">
          <el-collapse-item v-for="(item, index) in apis" :key="index" :name="item.apiNo">
            <div slot="title" style="display: flex; justify-content: space-between; width: 130px">
              <el-tooltip class="item" placement="bottom-start">
                <span slot="content">{{item.apiNo}}.{{item.apiName}}(<j-common com-no="apiType" :value="item.apiType" display-type="text"></j-common>)</span>
                <div style="width: 100%; white-space: nowrap; overflow:hidden; text-overflow: ellipsis">
                  {{item.apiNo}}.{{item.apiName}}
                </div>
              </el-tooltip>
              <el-dropdown trigger="click" @command="val=>{doSome(val, item)}">
                <el-button type="text" icon="el-icon-s-tools" @click.stop=""></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="editApi">修改</el-dropdown-item>
                  <el-dropdown-item command="delApi">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <template v-if="item.steps">
              <div class="li"
                   :class="(item.apiNo===activeName&&step.stepNo===currentStep)?'selected':''"
                   v-for="step in item.steps"
                   :key="step.stepNo"
                   @click="showStep(step)">{{step.stepNo}}</div>
            </template>
            <div class="li" :class="(item.apiNo===activeName&&'-1'===currentStep)?'selected':''"  @click="showStep()">New Step</div>
            <div class="li" :class="(item.apiNo===activeName&&'-2'===currentStep)?'selected':''" @click="showStepDoc()">文档</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="body r">
      <step v-if="currentKey==='step'" ref="step" @success="stepOperSuccess"  @deleted="deletedStep"></step>
      <api-doc v-else-if="currentKey==='stepDoc'"
                :api="currentApi"
                @success="saveDocSuccess"></api-doc>
    </div>
    <api-dialog ref="detail" @success="onSuccess"></api-dialog>
  </div>
</template>

<script>
  import ApiDialog from "@/components/Module/ApiDialog"
  import Step from "@/components/Module/Step"
  import ApiDoc from "../components/Module/ApiDoc";
  export default {
    name: "Module",
    components: {
      ApiDialog,
      Step,
      ApiDoc
    },
    props: {
      moduleNo: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        apis: [],
        keyword: null,
        form: {},
        activeName: null,
        currentStep: null,
        currentKey: null,
        currentApi: null
      };
    },
    computed: {
      waitSave() {
        return false;
      }
    },
    created(){
      this.getApis()
    },
    methods: {
      doSome(val, data){
        this[val](data)
      },
      editApi(data){
        this.$refs.detail.open(data)
      },
      delApi(data){
        this.confirm("这个api下的所有脚本及数据字典将一并删除，删除后不可恢复。是否确认删除？").then(()=>{
          this.$model.delApi(data).then(()=>{
            this.$util.success("操作成功")
            if(this.currentApi&&this.currentApi.apiNo===data.apiNo){
              this.currentKey = null
              this.currentStep = null
              this.currentApi = null
            }
            this.getApis()
          })
        }).catch(()=>{})
      },
      deletedStep(){
        this.currentKey = null
        this.currentStep = null
        this.getSteps(this.currentApi.apiNo)
      },
      handleChange(val){
        this.currentKey = null
        this.currentStep = null
        for(let i=0; i<this.apis.length; i++){
          if(this.apis[i].apiNo===val){
            if(!this.apis[i].steps){
              this.$model.getSteps({moduleNo: this.moduleNo, apiNo: this.apis[i].apiNo}).then(res=>{
                this.$set(this.apis[i], "steps", res.data)
              })
            }
            this.currentApi = this.apis[i]
            break;
          }
        }
      },
      getSteps(apiNo, stepNo){
        for(let i=0; i<this.apis.length; i++){
          if(this.apis[i].apiNo===apiNo){
            this.$model.getSteps({moduleNo: this.moduleNo, apiNo}).then(res=>{
              this.$set(this.apis[i], "steps", res.data)
              if(stepNo!=this.currentStep){
                let step = res.data.filter(it=>{return it.stepNo === stepNo})[0]
                this.showStep(step);
              }
            })
            break;
          }
        }
      },
      stepOperSuccess(stepNo){
        this.getSteps(this.activeName, stepNo)
      },
      saveDocSuccess(){
        this.$model.getApi({moduleNo: this.moduleNo, apiNo: this.activeName}).then(res=>{
          res.data.inJson = JSON.stringify(JSON.parse(res.data.inJson), null, 2)
          res.data.outJson = JSON.stringify(JSON.parse(res.data.outJson), null, 2)
          this.currentApi = res.data
          for(let i=0; i<this.apis.length; i++){
            if(this.apis[i].apiNo===this.activeName){
              this.apis.splice(i, 1, {...this.apis[i], ...res.data})
            }
          }
        })
      },
      showStep(step){
        this.currentKey = "step"
        this.currentStep = step?step.stepNo:"-1"
        this.$nextTick(()=>{
          this.$refs.step.setStep(step||{apiNo: this.activeName, moduleNo: this.moduleNo})
        })
      },
      showStepDoc(){
        this.currentKey = "stepDoc"
        this.currentStep = "-2"
      },
      onSuccess(){
        this.getApis()
      },
      getApis(){
        this.$model.getApis({moduleNo: this.moduleNo}).then(res=>{
          this.apis = res.data.map(it=>{
            it.inJson = JSON.stringify(JSON.parse(it.inJson), null, 2)
            it.outJson = JSON.stringify(JSON.parse(it.outJson), null, 2)
            return it
          })
          if(this.activeName){
            this.getSteps(this.activeName)
          }
          this.currentApi = this.apis.filter(it=>{return it.apiNo===this.activeName})[0]
        })
      },
      newApi() {
        this.$refs.detail.open({moduleNo: this.moduleNo})
      }
    }
  };
</script>

<style scoped lang="less">
  .module {
    display: flex;
    /deep/.el-collapse-item__header{
      height: unset;
      line-height: unset;
    }
    /deep/.el-collapse-item__content {
      padding-bottom: unset;
    }
    .l {
      width: 150px;
      background-color: #3C3F41;
      .ul {
        height: calc(100% - 28px);
        overflow: auto;
        .li{
          padding-left: 30px;
        }
        .li.selected {
          background-color: var(--blue);
        }
        .li:hover {
          cursor: pointer;
        }
      }
    }
    .r {
      width: calc(100% - 150px);
    }
  }
</style>