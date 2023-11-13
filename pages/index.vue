<template>
<div v-if="screenType !== null">
    <div class="t12 w700" style="height:1000px">your screen type is {{ screenType }}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            screenType: null
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>
