<template>
<div class="filter-sidebar__card__box">
    <v-text-field v-if="isFilter" density="compact" variant="outlined" :placeholder="`جستجو ${title}`" hide-details height="40px" prepend-inner-icon="mdi-magnify" class="mb-2 filter-sidebar__card__search" v-model="searchItem" />

    <div class="pl-2 pt-1" :class="{'filter-sidebar__card__scroll' : filteredItems.length > 5}">
        <template v-for="item in filteredItems" :key="item.id">
            <div class="d-flex justify-space-between align-center mb-1">
              <v-radio-group v-model="itemsModel"  @change="selectItems()">
                <v-radio hide-details :value="item" color="primary">
                  <template v-slot:label>
                    <div class="d-flex align-center justify-center">
                            <span class="number-font t12 fw700">
                             {{ item.label }}
                            </span>
                      <svgToman />
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
              if(this.param == 'site_price'){
                return this.items.sort((a, b) => {
                  if (a.label) a.label.localeCompare(b.label)
                  else a.to.localeCompare(b.to)
                });

              }
              else {
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
                }

                else {
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
                param: this.param,
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
        if (this.$route.query.attribute) {
            const FilteredAttribute = JSON.parse(this.$route.query.attribute)
            FilteredAttribute.forEach(attribute => {
                const findAttribute = this.items.find(findAttribute => findAttribute.id === attribute)
                if (findAttribute) this.itemsModel.push(findAttribute.id)
            })
        }
    }
}
</script>
