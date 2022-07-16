<template>
    <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

export default {
    setup() {
        const route = useRoute();
        const layout = computed(() => route.meta.layout);

        return {
            layout
        };
    },
    components: { MainLayout, AuthLayout }
};
</script>

<style lang="scss">
html,
body {
    margin: 0px;
    min-height: 100%;
    height: 100%;
}

#app {
    height: 100%;
    width: 100%;
    min-height: 100%;
}
</style>
