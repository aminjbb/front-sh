<template>
  <div class="filter-sidebar__card__box">
    <v-text-field v-if="isFilter" density="compact" variant="outlined" :placeholder="`جستجو ${title}`" hide-details
                  height="40px" prepend-inner-icon="mdi-magnify" class="mb-2 filter-sidebar__card__search"
                  v-model="searchItem"/>

    <div class="pl-2 pt-1" :class="{'filter-sidebar__card__scroll' : filteredItems.length > 5}">
      <template v-for="item in filteredItems" :key="item.id">
        <div class="d-flex justify-space-between align-center mb-1">
          <v-radio-group v-model="itemsModel" @change="selectItems()">
            <v-radio hide-details :value="item" color="primary">
              <template v-slot:label>
                <div class="d-flex align-center justify-center">
                                <span class="number-font t12 fw700">
                                    {{ item.label }}
                                </span>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsModel: null,
      searchItem: null,
    }
  },

  props: {
    /**
     * isFilter
     */
    isFilter: Boolean,
    /**
     * Title
     */
    title: String,

    /**
     * index of filter
     */
    index: Number,

    /**
     * Name of filter
     */
    name: String,
    /**
     * param for filter
     */
    param: String,

    /**
     * List of item
     */
    items: Array,

    /**
     * Clear modal if 'clear' be true
     */
    clear: {
      type: Boolean,
      default: false
    },

    showEnName: {
      type: Boolean,
      default: false
    },
    selectedAmount: {
      type: String,
      default: null
    },
  },

  computed: {
    /**
     * Filter Items by search and sort
     */
    filteredItems() {
      if (this.searchItem == null || this.searchItem == '') {
        if (this.param == 'site_price') {
          return this.items.sort((a, b) => {
            if (a.label) a.label.localeCompare(b.label)
            else a.to.localeCompare(b.to)
          });

        } else {
          return this.items.sort((a, b) => {
            if (a.name) a.name.localeCompare(b.name)
            else a.value.localeCompare(b.value)
          });
        }

      } else {
        const lowerCaseSearch = this.searchItem.toLowerCase();
        if (this.param == 'brands') {
          return this.items
              .sort((a, b) => a.to.localeCompare(b.to))
              .filter(
                  (brand) =>
                      brand.to.toLowerCase().includes(lowerCaseSearch)
              );
        } else {
          return this.items
              .sort((a, b) => a.value.localeCompare(b.value))
              .filter(
                  (brand) =>
                      brand.value.toLowerCase().includes(lowerCaseSearch)
              );
        }

      }
    },
  },

  watch: {
    clear(newValue) {
      if (newValue) {
        this.clearModal();
      }
    },
  },

  methods: {
    /**
     * Emit selected items to parent
     */
    selectItems() {
      console.log(this.itemsModel)
      const obj = {
        param: this.param,
        name: this.name,
        values: this.itemsModel
      }
      this.$emit('selectedFilter', this.index);
      this.$emit('selectItems', obj);
    },

    /**
     * Clear modal
     */
    clearModal() {
      this.itemsModel = null;
      this.$emit('changeClearToFalse');
    }
  },

  mounted() {
    if (!this.$route.query.site_price_from && this.$route.query.site_price_to) {
      const findPrice = this.items.find(element=>element.to == this.$route.query.site_price_to)
      this.itemsModel = findPrice
      this.$emit('selectedFilter', this.index);
    }
    else if (this.$route.query.site_price_from && this.$route.query.site_price_to){
      const findPrice = this.items.find(element=>element.to == this.$route.query.site_price_to && element.from == this.$route.query.site_price_from)
      this.itemsModel = findPrice
      this.$emit('selectedFilter', this.index);
    }
    else{
      if (this.selectedAmount){
        if (this.selectedAmount.param === "site_price"){
          this.itemsModel = this.selectedAmount.amount
        }
      }

    }
  }
}
</script>
