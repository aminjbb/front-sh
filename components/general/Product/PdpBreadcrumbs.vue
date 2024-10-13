<template>
  <div v-if="(items && items.length) && screenType === 'desktop'">
    <v-breadcrumbs :items="items">

    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenType: null
    }
  },

  props:{
    items:Array,
    icon: Boolean
  },

  mounted() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
  },
}
</script>

<style>

</style>
