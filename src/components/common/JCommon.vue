<template>
    <el-select v-model="currentValue"
               placeholder="请选择"
               @change="changeHandle"
               style="width: 100%"
               v-if="displayType==='select'">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    <span v-else>{{currentValue}}.{{currentLabel}}</span>
</template>

<script>
    export default {
        name: "JCommon",
        props: {
            comNo: {
                type: String,
                required: true
            },
            value: {},
            displayType: {
                type: String,
                default: "select"
            }
        },
        data(){
            return {
                options: [],
                currentValue: this.value,
                currentLabel: null
            }
        },
        watch: {
            value(val){
                if(this.currentValue!==val){
                    this.currentValue = val
                    this.setCurrentLabel(val)
                }
            },
            currentValue(val){
                if(this.value!=val){
                    this.$emit("input", val)
                }
            }
        },
        created() {
            this.getOptions()
        },
        methods: {
            getOptions(){
                this.$store.dispatch("common", this.comNo).then(res=>{
                    this.options = res
                    if(this.currentValue){
                        this.setCurrentLabel(this.currentValue)
                    }
                })
            },
            changeHandle(val){
              this.setCurrentLabel(val)
            },
            setCurrentLabel(val){
                for(let i=0; i<this.options.length; i++){
                    if(val===this.options[i].value){
                        this.currentLabel = this.options[i].label
                        break
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>