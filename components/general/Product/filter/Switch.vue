<template>
  <div class="filter-sidebar__card my-2 filter-sidebar__card--status">
    <div class="d-flex justify-space-between align-center">
      <span class="t16 w400 text-grey-darken-2">{{ title }}</span>

      <v-switch
          v-model="availableItems"
          inset
          color="success"
          hide-details
          @change="changeStatus()"/>
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
    if (this.$route.query.stock == 1){
      this.availableItems= true
    }
    else {
      this.availableItems= false
    }
  }
}
</script>

