<template lang="">
<div class="filter-sidebar__card my-2 filter-sidebar__card--status">
    <div class="d-flex justify-space-between align-center">
        <span class="t16 w400 text-grey-darken-2">{{title}}</span>

        <v-switch
            v-model="availableItems"
            inset
            color="success"
            hide-details
            @change="changeStatus()" />
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            availableItems: false,
        }
    },

    props:{
        /**
         * Title
         */
        title:String,

        /**
         * Switch name
         */
        switchName:String,
    }
}
</script>

