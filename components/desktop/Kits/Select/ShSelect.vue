<template>

  <v-menu max-height="279" class="select-border">
    <template v-slot:activator="{ props }">
      <v-select v-bind="props" :label="label" readonly density="compact" variant="outlined" :rules="rule"
                item-title="title"
                item-value="value" hide-details v-model="selectValue"/>
    </template>
    <v-list style="border-radius: 16px" class="mt-1 sh--select">
      <div  v-for="(item, index) in items">
        <v-list-item

            :key="index"
            :value="index"
            @click="selectItem(item)"
        >
          <div class="d-flex align-center mb-3" >
           <span class="ml-2">
                 <img v-if="selectValue?.value === item.value" height="18" width="18"
                      src="@/components/general/Kits/Icons/tick-square-primary.svg">
               </span>
            <span class="t12 w700" :class="selectValue?.value === item.value ?'text-primary' :'text-sGrayDarken2'">
              {{ item?.title }}

          </span>
          </div>
          <v-divider v-if="index !== items.length -1"/>
        </v-list-item>
      </div>

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
    },
    index: {
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
      if (this.index !== '')    this.$emit('changeValue',{value: this.selectValue , index: this.index})
      else    this.$emit('changeValue', this.selectValue)
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