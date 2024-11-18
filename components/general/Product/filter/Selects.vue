<template>
<div class="filter-sidebar__card__box">
    <v-text-field
        v-if="isSearchable"
        density="compact"
        variant="outlined"
        :placeholder="` جستجو در ${title}`"
        hide-details
        height="40px"
        prepend-inner-icon="mdi-magnify"
        class="mb-2 filter-sidebar__card__search"
        v-model="searchItem" />

    <div class="pl-2 pt-1" :class="{'filter-sidebar__card__scroll' : filteredItems && filteredItems.length > 5}">
        <template v-for="item in filteredItems" :key="item.id">
            <div class="d-flex justify-space-between align-center mb-1">
                <v-checkbox
                    v-model="itemsModel"
                    :label="item.label ? item.label : item.value"
                    @change="selectItems()"
                    hide-details
                    color="primary"
                    :value="item.id" />

                <span v-if="item?.name && ShowEnName && param !== 'colors'" class="t12 w500 text-grey-lighten-1 text-left ltr">{{item.name}}</span>

                <template v-else-if="param === 'colors'">
                    <span class="filter-sidebar__card__color" :style="{ backgroundColor: item?.value }" :class="item?.value === '#ffffff' || item?.value === '#FF00FF00' ? 'border' : '' "></span>
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
         * List of selectedFilter
         */
        selectedFilter: Array,

        /**
         * index of filter
         */
        index: Number,

        /**
         * Clear modal if 'clear' be true
         */
        clear: {
            type: Boolean,
            default: false
        },

        ShowEnName: {
            type: Boolean,
            default: true
        },
      isSearchable: {
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

               try {
                 return this.items.sort((a, b) =>{
                   if (a.label)  a.label.localeCompare(b.label)
                   else  a.value.localeCompare(b.value)
                 });  
               }
               catch (e) {
                 
               }
               
            } else {
                const lowerCaseSearch = this.searchItem.toLowerCase();
                if (this.param == 'brands' || this.param == 'colors'){
                  return this.items
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .filter(
                          (item) =>
                              item.label.toLowerCase().includes(lowerCaseSearch)
                      );
                }
                else{
                  return this.items
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .filter(
                          (item) =>
                              item.label.toLowerCase().includes(lowerCaseSearch)
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
            if (obj.values.length) this.$emit('selectedFilter', this.index);
            else  this.$emit('removeSelectedFilter', this.index);

            this.$emit('selectItems', obj);
        },

        /**
         * Clear modal
         */
        clearModal() {
            this.itemsModel = [];
          this.$emit('changeClearToFalse');

        }
    },

  mounted() {
      try {
        if(this.param === 'brands'){
          if(typeof this.$route.query[`brands[]`]  ==='object'){
            const FilteredBrands = this.$route.query[`brands[]`]
            FilteredBrands.forEach(brand=>{
              const findBrand =  this.items.find(searchBrand=>searchBrand.id == brand)
              if (findBrand) {
                this.itemsModel.push(findBrand.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
          else if(typeof this.$route.query[`brands[]`] ==='string'){
            const findAttribute =  this.items.find(findAttribute=> findAttribute.id == this.$route.query[`brands[]`])
            if (findAttribute) {
              this.itemsModel.push(findAttribute.id)
              this.$emit('selectedFilter', this.index);
            }
          }
          else {
            const brandsFilter = this.selectedFilter.filter(obj=> obj.param === 'brands')
            brandsFilter.forEach(item=>{
              const findAttribute =  this.items.find(findAttribute=> findAttribute.id == item.value)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
        }
        else if (this.param === 'attributes'){
          if(typeof this.$route.query[`attributes[]`] ==='object'){
            const FilteredAttribute = this.$route.query[`attributes[]`]
            FilteredAttribute.forEach(attribute=>{
              const findAttribute =  this.items.find(findAttribute=>findAttribute.id == attribute)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
          else if(typeof this.$route.query[`attributes[]`] ==='string'){
            const findAttribute =  this.items.find(findAttribute=> findAttribute.id == this.$route.query[`attributes[]`])
            if (findAttribute) {
              this.itemsModel.push(findAttribute.id)
              this.$emit('selectedFilter', this.index);
            }
          }
          else {
            const attributesFilter = this.selectedFilter.filter(obj=> obj.param === 'attributes')
            attributesFilter.forEach(item=>{
              const findAttribute =  this.items.find(findAttribute=> findAttribute.id == item.value)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
        }
        else if (this.param === 'products'){
          if(typeof this.$route.query[`products[]`]==='object' ){
            const FilteredAttribute = this.$route.query[`products[]`]
            FilteredAttribute.forEach(attribute=>{
              const findAttribute =  this.items.find(findAttribute=>findAttribute.id == attribute)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
          else if(typeof this.$route.query[`products[]`] ==='string'){
            const findAttribute =  this.items.find(findAttribute=> findAttribute.id == this.$route.query[`products[]`])
            if (findAttribute) {
              this.itemsModel.push(findAttribute.id)
              this.$emit('selectedFilter', this.index);
            }
          }
          else {
            const productsFilter = this.selectedFilter.filter(obj=> obj.param === 'products')
            productsFilter.forEach(item=>{
              const findAttribute =  this.items.find(findAttribute=> findAttribute.id == item.value)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
        }
        else if (this.param === 'categories'){
          if(typeof this.$route.query[`categories[]`] ==='object'){
            const FilteredAttribute = this.$route.query[`categories[]`]
            FilteredAttribute.forEach(attribute=>{
              const findAttribute =  this.items.find(findAttribute=>findAttribute.id == attribute)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
          else if(typeof this.$route.query[`categories[]`] ==='string'){
            const findAttribute =  this.items.find(findAttribute=> findAttribute.id == this.$route.query[`categories[]`])
            if (findAttribute) {
              this.itemsModel.push(findAttribute.id)
              this.$emit('selectedFilter', this.index);
            }
          }
          else {
            const catrgoriesFilter = this.selectedFilter.filter(obj=> obj.param === 'categories')
            catrgoriesFilter.forEach(item=>{
              const findAttribute =  this.items.find(findAttribute=> findAttribute.id == item.value)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
        }
        else if (this.param === 'colors'){
          if(typeof this.$route.query[`colors[]`] ==='object'){
            const FilteredAttribute = this.$route.query[`colors[]`]
            FilteredAttribute.forEach(attribute=>{
              const findAttribute =  this.items.find(findAttribute=>findAttribute.id == attribute)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
          else if(typeof this.$route.query[`colors[]`] ==='string'){
            const findAttribute =  this.items.find(findAttribute=> findAttribute.id == this.$route.query[`colors[]`])
            if (findAttribute) {
              this.itemsModel.push(findAttribute.id)
              this.$emit('selectedFilter', this.index);
            }
          }
          else {
            const colorFilter = this.selectedFilter.filter(obj=> obj.param === 'colors')
            colorFilter.forEach(color=>{
              const findAttribute =  this.items.find(findAttribute=> findAttribute.id == color.value)
              if (findAttribute) {
                this.itemsModel.push(findAttribute.id)
                this.$emit('selectedFilter', this.index);
              }
            })
          }
        }
      }
      catch (e) {
        // console.log(e)
      }

  }

}
</script>
