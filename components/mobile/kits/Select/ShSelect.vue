<template>
  <v-bottom-sheet height="360" v-model="sheet">
    <template v-slot:activator="{ props }">
      <v-select v-bind="props" :label="label" readonly density="compact" variant="outlined" :rules="rule"
                item-title="title"
                item-value="value" hide-details v-model="selectValue"/>
    </template>
    <v-card height="360" style="border-top-left-radius: 16px !important;border-top-right-radius: 16px !important;" class="sh--select_mobile">
      <div class="d-flex justify-space-between px-3 py-4" >
        <span class="t16 w700">
          انتخاب {{ title }}
        </span>
        <span class="bg-sGrayLighten5 close_box">
          <v-icon @click="sheet= false" size="20" color="sGrayDarken1" >mdi-close</v-icon>
        </span>
      </div>
      <div class="px-3 mt-3">
        <v-row justify="center" align="center">
           <v-col cols="12" v-for="(item , index) in items" @click="selectItem(item)">
             <div class="t12 w700  mb-4 d-flex align-center" :class="selectValue?.value === item.value ?'text-primary' :'text-sGrayDarken2'">
               <span class="ml-2">
                 <img v-if="selectValue?.value === item.value" height="18" width="18" src="@/components/general/Kits/Icons/tick-square-primary.svg">
               </span>
               {{item?.title}}
             </div>
             <v-divider v-if="index !== (items.length - 1 )"/>
           </v-col>
        </v-row>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    label:{
      type:String,
      default: ''
    },
    title:{
      type:String,
      default: 'موضوع'
    },
    index:{
      type:String,
      default: ''
    },


  },
  data() {
    return {
      selectValue: null,
      sheet:false,
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
      if (this.index !== '') this.$emit('changeValue', {value:this.selectValue , index:this.index})
      else  this.$emit('changeValue', this.selectValue)
    }
  }
}
</script>

<style>
.close_box{
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>