<template>
    <div>
        <Tabs v-model="tvalue">
            <TabPane label="标签一" >标签一的内容</TabPane>
            <TabPane label="标签二" >标签二的内容</TabPane>
            <TabPane label="标签三" >标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    name: 'brand',
    data(){
        return{
           tvalue: 0, 
        }
    },
}
</script>

<style scoped>

</style>