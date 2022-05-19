
<template>details {{ props.templateData.data }}</template>

<script setup>
const props = defineProps(['templateData']);

console.log(props.templateData.data);
</script>



