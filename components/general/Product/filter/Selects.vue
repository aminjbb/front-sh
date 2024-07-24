<template>
<div class="filter-sidebar__card__box">
    <v-text-field
        density="compact"
        variant="outlined"
        :placeholder="` جستجو در ${title}`"
        hide-details
        height="40px"
        prepend-inner-icon="mdi-magnify"
        class="mb-2 filter-sidebar__card__search"
        v-model="searchItem" />

    <div class="pl-2 pt-1" :class="{'filter-sidebar__card__scroll' : filteredItems.length > 5}">
        <template v-for="item in filteredItems" :key="item.id">
            <div class="d-flex justify-space-between align-center mb-1">
                <v-checkbox
                    v-model="itemsModel"
                    :label="item.label ? item.label : item.value"
                    @change="selectItems()"
                    hide-details
                    :value="item.id" />

                <span v-if="item.name && !showEnName && param !== 'colors'" class="t14 w500 text-grey-lighten-1">{{item.name}}</span>

                <template v-else-if="param === 'colors'">
                    <span class="filter-sidebar__card__color" :style="{ backgroundColor: item.color.value }" :class="item.color.value === '#ffffff' || item.color.value === '#FF00FF00' ? 'border' : '' "></span>
                </template>
            </div>
        </template>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            itemsModel: [],
            searchItem: null,
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
    },

    computed: {
        /**
         * Filter Items by search and sort
         */
        filteredItems() {
            if (this.searchItem == null || this.searchItem == '') {

                return this.items.sort((a, b) =>{
                 if (a.name)  a.name.localeCompare(b.name)
                  else  a.value.localeCompare(b.value)
                });
            } else {
                const lowerCaseSearch = this.searchItem.toLowerCase();
                if (this.param == 'brands'){
                  return this.items
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .filter(
                          (brand) =>
                              brand.label.toLowerCase().includes(lowerCaseSearch)
                      );
                }
                else{
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
            const obj = {
                param:this.param,
                name: this.name,
                values: this.itemsModel
            }

            this.$emit('selectItems', obj);
        },

        /**
         * Clear modal
         */
        clearModal() {
            this.searchItem = [];
        }
    },

  mounted() {
      if(this.param === 'brands'){
        if(this.$route.query.brands){
          let selectedBrands = []
          const FilteredBrands = JSON.parse(this.$route.query.brands)
          FilteredBrands.forEach(brand=>{
            const findBrand =  this.items.find(searchBrand=>searchBrand.id === brand)
            if (findBrand) this.itemsModel.push(findBrand.id)
          })
        }
      }
      else if (this.param === 'attributes'){
        if(this.$route.query.attribute){
          const FilteredAttribute = JSON.parse(this.$route.query.attribute)
          FilteredAttribute.forEach(attribute=>{
            const findAttribute =  this.items.find(findAttribute=>findAttribute.id === attribute)
            if (findAttribute) this.itemsModel.push(findAttribute.id)
          })
        }
      }
  }

}
</script>
