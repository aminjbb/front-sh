<template>

  <v-menu>
    <template v-slot:activator="{ props }">
      <v-select v-bind="props" :label="label" readonly density="compact" variant="outlined" :rules="rule"
                item-title="title"
                item-value="value" hide-details v-model="selectValue"/>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="selectItem(item)"
      >
        <div class="d-flex align-center" >
           <span class="ml-2">
                 <img v-if="selectValue?.value === item.value" height="18" width="18"
                      src="@/components/general/Kits/Icons/tick-square-primary.svg">
               </span>
          <span class="t12 w700" :class="selectValue?.value === item.value ?'text-primary' :'text-sGrayDarken2'">
              {{ item?.title }}
          </span>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>

</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectValue: null,
      sheet: false,
      rule: [v => !!v || 'این فیلد الزامی است'],
    }
  },

  methods: {
    selectItem(item) {
      this.selectValue = item
      this.sheet = false
      this.changeValue()
    },
    changeValue() {
      this.$emit('changeValue', this.selectValue)
    }
  }
}
</script>

<style>
.close_box {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>