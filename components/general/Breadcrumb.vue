<template lang="">
<div v-if="items && items.length">
    <v-breadcrumbs :items="items">
        <template v-slot:divider>
            <span>/</span>
        </template>
    </v-breadcrumbs>
</div>
</template>

<script>
export default {
    props:{
        items:Array
    }
}
</script>

<style>
@import '~/assets/scss/components/general/breadcrumbs.scss';
</style>
