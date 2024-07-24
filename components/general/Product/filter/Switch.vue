<template>
<div class="filter-sidebar__card filter-sidebar__card--status" :class="screenType === 'desktop' ? 'my-2' : 'm-0'">
    <div class="d-flex justify-space-between align-center">
        <span :class="screenType === 'desktop' ? 't15 w400 text-grey-darken-2' : 't12 w700 color-3c'">{{ title }}</span>

        <v-switch v-model="availableItems" color="primary" hide-details @change="changeStatus()" />
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            availableItems: false,
            screenType: 'desktop',
        }
    },

    props: {
        /**
         * Title
         */
        title: String,

        /**
         * Name of filter
         */
        name: String,
        /**
         * param for filter
         */
        param: String,

        /**
         * Switch name
         */
        switchName: String,
    },

    methods: {
        /**
         * Emit selected items to parent
         */
        changeStatus() {
            const obj = {
                param: this.param,
                name: this.name,
                values: this.availableItems
            }

            this.$emit('changeStatus', obj);
        },
    },

    mounted() {
        if (this.$route.query.stock == 1) {
            this.availableItems = true
        } else {
            this.availableItems = false
        }

        /**
         * Check screen size
         */
         window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style scoped>
.color-3c{
    color: #3c3c3c;
}
</style>
