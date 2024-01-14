<template lang="">
<div class="warning d-flex align-center">
    <v-icon :icon="icon" :color="color" class="ml-1"/>
    <span :class="`text-${color}`" class="t13 w400 mt-1">{{ text }}</span>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Warning color
         */
        color: {
            type: String,
            default: 'warning'
        },

        /**
         * Warning icon
         */
        icon: {
            type: String,
            default: 'mdi-alert-remove-outline'
        },

        /**
         * Warning text
         */
        text: String
    }

}
</script>
