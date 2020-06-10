<template>
  <div class="body x">
    <div class="t">
      <codemirror ref="coder" v-model="inJson" :options="jsonEditOptions"></codemirror>
    </div>
    <div class="b">
      <div class="oper">
        <div>
          POST Method /jane/sql/executeTest?moduleNo={{api.moduleNo}}&apiNo={{api.apiNo}}&rollback={{rollback}}
        </div>
        <div>
          <span style="margin-right: 20px">
            回滚：<el-checkbox v-model="rollback"></el-checkbox>
          </span>
          <el-button @click="executeTest" type="success">提交</el-button>
        </div>
      </div>
      <div class="bb">
        <codemirror ref="coder" v-model="outJson" :options="jsonOptions"></codemirror>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ApiTest",
    props: {
      api: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        inJson: this.api.inJson,
        outJson: this.api.outJson,
        rollback: true,
        inOption: {...this.jsonOptions}
      }
    },
    methods: {
      executeTest(){
        let query = {
          moduleNo: this.api.moduleNo,
          apiNo: this.api.apiNo,
          rollback: this.rollback
        }
        this.$model.executeTest(JSON.parse(this.inJson), query).then(res=>{
          this.outJson = JSON.stringify(res, null, 2)
        })
      }
    }
  };
</script>

<style scoped>
/*/deep/.el-textarea, /deep/.el-textarea textarea{
  height: 100%!important;
}
.t{
  font-size: 1.6rem;
}
.test{
  display: flex;
  height: calc(100% - 28px);
}
.test .c{
  height: 100%;
  display: flex;
  align-items: center;
}
.test .l, .test .r{
  height: 100%;
  width: 50%;
}*/
</style>