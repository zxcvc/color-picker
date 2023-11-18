<script setup lang="ts">
import {ColorPanel} from '../../src/index'
import {shallowRef,watchEffect} from 'vue'

const hex = shallowRef("#ffffff")
const rgba = shallowRef([1,1,1,1])
watchEffect(()=>{
    // console.log(hex.value,rgba.value)
})
</script>

<template>
    <ColorPanel v-model:hex="hex" ></ColorPanel>
</template>

<style scoped>

</style>
