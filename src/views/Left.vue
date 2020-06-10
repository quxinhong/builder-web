<template>
    <div class="left">
        <div class="left-top">
            <span>目录</span>
            <el-button-group>
                <el-button @click="newMenu">新建</el-button>
            </el-button-group>
        </div>
        <div>
            <el-tree
                    :data="tree"
                    node-key="menuId"
                    default-expand-all
                    highlight-current
                    @node-click="nodeClick">
                <div slot-scope="{ node, data }">
                    <i :class="data|iconFilter"></i>
                    <span>{{ data.menuName }}</span>
                    <el-dropdown style="position: absolute; right: 2px" @command="val=>{doSome(val, data)}" trigger="click">
                        <el-button type="text" icon="el-icon-s-tools" @click.stop=""></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="editMenu">修改</el-dropdown-item>
                            <el-dropdown-item command="delMenu">删除</el-dropdown-item>
                            <el-dropdown-item command="newMenu" v-if="$util.isBlank(data.moduleNo)">新建</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-tree>
        </div>
        <menu-dialog ref="detail" @success="getMenus"></menu-dialog>
    </div>
</template>

<script>
    import MenuDialog from "../components/MenuDialog";
    export default {
        name: "Left",
        components: {
            MenuDialog
        },
        data(){
            return {
                menus: [],
                tree: []
            }
        },
        created() {
            this.getMenus()
        },
        filters: {
          iconFilter(val){
              if(val.moduleNo){
                  return "el-icon-s-operation"
              }else{
                  return "el-icon-folder"
              }
          }
        },
        methods: {
            nodeClick(data){
                let moduleNo = data.moduleNo
                if(!this.$util.isBlank(moduleNo)){
                    this.$emit("goWhere", {
                        is: "j-module",
                        name: "module_"+moduleNo,
                        label: data.menuName,
                        bind: {moduleNo}
                    })
                }
            },
            doSome(val, data){
                this[val](data)
            },
            newMenu(data){
                let obj = {}
                if(data){
                    obj.parentId = data.menuId
                }
                this.$refs.detail.open(obj)
            },
            editMenu(data){
                this.$refs.detail.open({menuId: data.menuId})
            },
            delMenu(data){
                this.confirm("菜单下的模块及api等将一并删除，删除后不可恢复。是否确认删除？").then(()=>{
                    this.$model.delMenu({menuId: data.menuId}).then(()=>{
                        this.getMenus()
                    })
                })
            },
            getMenus(){
                this.$model.getMenus().then(res=>{
                    this.menus = res.data||[]
                    this.tree = this.initTree(this.menus, 0)
                })
            },
            initTree(list, parentId){
                let res = []
                for(let i=0; i<list.length; i++){
                    let item = {...list[i]}
                    if(item.parentId === parentId){
                        if(this.$util.isBlank(item.moduleNo)){
                            let children = this.initTree(list, item.menuId)
                            if(children.length){
                                item["children"] = children
                            }
                        }
                        res.push(item)
                    }
                }
                return res.sort((a, b)=>{
                    return a.orderNum-b.orderNum
                })
            }
        }
    }
</script>

<style scoped lang="less">
.left{
    height: 100%;
    overflow: auto;
    .left-top{
        border-bottom: 1px solid #000;
        background: #505050;
        display: flex;
        justify-content: space-between;
        /deep/.el-button-group .el-button{
            border: none;
        }
    }
    /deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background-color: var(--blue);
    }
}
</style>