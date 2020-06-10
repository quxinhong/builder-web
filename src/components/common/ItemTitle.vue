<template>
    <div class="item_title">
        <div class="left">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ItemTitle"
    }
</script>

<style scoped>
    .item_title{
        display: flex;
        justify-content: space-between;
    }
    .item_title .left{
        font-size: 16px;
        color: #FFF;
    }
</style>