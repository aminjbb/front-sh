<template>
  <div class="c-modal">
    <div :class="filterLength ? 'selected-filters ' : ''"
         class="product-mobile-control w-100 d-flex justify-start align-center" @click="openSheet()">
      <v-icon icon="mdi-filter-outline" color="grey-darken-1" class="mr-1"/>

      <span class="text-grey-darken-3 t12 w700">فیلتر
            <template v-if="filterLength">
                <span class="number-font t12">( {{ filterLength }} )</span>
            </template>
        </span>
    </div>

    <v-bottom-sheet v-model="sheet" fullscreen>
      <div class="filter-sheet bg-white">
        <div class="close-modal cur-p" @click="closeSheet()">
          <v-icon color="#9e9e9e" size="small">mdi-close</v-icon>
        </div>

        <h4 class="t18 w700 l30 mt-7 mb-5 px-3">فیلتر</h4>

        <div class="filter-main-scroll">
          <div class="px-5">
            <template v-for="(filter, index) in filterList" :key="`filter${index}`">

              <div class="filter-sidebar__card filter-sidebar__card--mobile" :id="`filter-sidebar__card--${index}`">
                <header v-if="filter.type !== 'switch' && filter.type !== 'period' "
                        class="d-flex align-center justify-space-between filter-sidebar__card__header my-4"
                        @click="slideToggleCard(index)">
                  <span class="t12 w700">{{ filter.label }}</span>
                  <div class="d-flex align-center">
                    <!--                  <v-icon size="5" icon="mdi-checkbox-blank-circle" color="success" />-->
                    <v-badge v-if="returnShowBadgeFilter(index)" color="primary" dot class="ml-2 mb-2"/>
                    <v-icon icon="mdi-chevron-down" color="grey"/>
                  </div>
                </header>

                <template v-if="filter.type === 'select'">
                  <generalProductFilterSelects :isSearchable="filter.is_searchable" :index="index" @selectedFilter="addSelectedFilterForShowBadge"
                                               :ShowEnName="filter.param === 'categories' || filter.param === 'products' ? false : true"
                                               :items="filter.data" :clear="clearAll" :title="filter.label"
                                               :name="filter.label" :param="filter.param"
                                               @selectItems="selectFiltersModalEmit"
                                               @changeClearToFalse="changeClearToFalse"/>
                </template>

                <template v-else-if="filter.type === 'switch'">
                  <generalProductFilterSwitch :index="index" @removeSelectedFilter="removeSelectedFilterForShowBadge"
                                              :selectedStock="stockModel"
                                              @selectedFilter="addSelectedFilterForShowBadge"
                                              @changeClearToFalse="changeClearToFalse"
                                              @changeStatus="selectFiltersModalEmit" :title="filter.label"
                                              :clear="clearAll" :name="filter.label" :param="filter.param"
                                              :switchName="filter.value"/>
                </template>

                <template v-else-if="filter.type === 'checkbox'">
                  <generalProductFilterSelects :isSearchable="filter.is_searchable" :index="index" @removeSelectedFilter="removeSelectedFilterForShowBadge"
                                               :selectedFilter="finalFilterObject"
                                               @selectedFilter="addSelectedFilterForShowBadge"
                                               :ShowEnName="filter.param === 'categories' || filter.param === 'products' ? false : true"
                                               @changeClearToFalse="changeClearToFalse" :items="filter.data"
                                               :title="filter.label" :name="filter.label" :param="filter.param"
                                               :clear="clearAll" @selectItems="selectFiltersModalEmit"/>
                </template>

                <template v-else-if="filter.type === 'period'">
                  <div class="filter-sidebar__card mt-3" :id="`filter-sidebar__card--${filterList.length}`">
                    <header class="d-flex align-center justify-space-between filter-sidebar__card__header mb-4 mt-4"
                            @click="slideToggleCard(filterList.length)">
                      <span class="t12 w700">محدوده قیمت</span>

                      <div class="d-flex align-center">
                        <!--                  <v-icon size="5" icon="mdi-checkbox-blank-circle" color="success" />-->
                        <v-badge v-if="returnShowBadgeFilter(index)" color="primary" dot class="ml-2 mb-2">
                        </v-badge>
                        <v-icon icon="mdi-chevron-down" color="grey"/>
                      </div>
                    </header>

                    <div>

                      <generalProductFilterSelectsMount  :index="index"
                                                        :selectedAmount="amountModel"
                                                        @removeSelectedFilter="removeSelectedFilterForShowBadge"
                                                        @selectedFilter="addSelectedFilterForShowBadge"
                                                        @changeClearToFalse="changeClearToFalse"
                                                        @selectItems="setAmount" :isFilter="filter?.is_searchable"
                                                        :items="filter?.data" :title="filter.name" :param="filter.param"
                                                        :name="filter.name"/>
                    </div>
                  </div>
                </template>
              </div>

              <v-divider v-if="index < (filterList.length - 1)" color="grey"/>
            </template>
          </div>

          <div class="filter-mobile-btn pa-3">
            <v-btn @click="createRoute(finalFilterObject)" height="45" title="اعمال فیلتر" class="btn btn--submit"
                   :disabled="finalFilterObject.length == 0 && amountModel===null && stockModel === null">
              اعمال فیلتر
            </v-btn>
            <v-btn @click="deleteAllFilter()" height="45" title="حذف فیلتر ها" class="btn btn--submit-border"
                   :disabled="!activeFilterButton && finalFilterObject.length == 0 && amountModel===null && stockModel === null">
              حذف فیلترها
            </v-btn>
          </div>
        </div>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  setup() {
    const {
      filterQuery,
    } = new PLP()
    return {filterQuery}
  },
  data() {
    return {
      sheet: false,
      selectedItem: null,
      availableItems: false,
      activeFilterButton: false,
      selectedFilters: new Set([]),
      finalFilterObject:[],
      clearAll: false,
      amountModel:null,
      stockModel:null,
      amount: {
        max: null,
        min: null
      },
      amounts: [{
        label: '10 هزار',
        value: '100000'
      },
        {
          label: '25 هزار',
          value: '250000'
        },
        {
          label: '50 هزار',
          value: '500000'
        },
        {
          label: '100 هزار',
          value: '1000000'
        },
        {
          label: '150 هزار',
          value: '1500000'
        },
        {
          label: '200 هزار',
          value: '2000000'
        },
        {
          label: '250 هزار',
          value: '2500000'
        },
        {
          label: '300 هزار',
          value: '3000000'
        }
      ],
    }
  },

  props: {
    filterList: Array,
    filterLength: String | Number
  },

  methods: {
    /**
     * change clear
     */
    changeClearToFalse() {
      this.clearAll = false
    },

    /**
     * for show badge
     * @param {*} index
     */
    addSelectedFilterForShowBadge(index) {
      this.selectedFilters.add(index)
    },
    /**
     * for show badge
     * @param {*} index
     */
    removeSelectedFilterForShowBadge(index) {
      this.selectedFilters.delete(index)
    },

    /**
     * for show badge
     * @param {*} index
     */
    returnShowBadgeFilter(index) {
      const showBadgeIndex = this.selectedFilters.has(index)
      if (showBadgeIndex) return true
      return false
    },
    /**
     * Remove Filter For PLP Page
     */
    removeAllFilter() {
      this.$router.push(`${this.$route.path}`)
      this.clearAll = true
      this.selectedFilters = new Set([])
    },
    /**
     * Toggle card box
     * @param {*} index
     */
    slideToggleCard(id) {
      const specificElement = document.getElementById(`filter-sidebar__card--${id}`);
      specificElement.querySelector('.v-icon.mdi-chevron-down').classList.toggle('mdi-chevron-up')
      specificElement.querySelector('.filter-sidebar__card__box').classList.toggle('open-card');
    },

    /**
     * List type filters
     * @param {*} arr
     */
    listFiltersModalEmit(arr) {
      this.$emit('listFiltersModal', arr);
    },

    /**
     * Select type filters
     * @param {array} Arr
     */
    selectFiltersModalEmit(arr) {
      // this.$emit('selectFiltersModal', arr);
    if (arr.param === 'stock'){
      const form = {
        param: arr.param,
        value: arr.values
      };
      this.stockModel = form
    }
    else{
      this.selectFiltersModal(arr)
    }

    },

    /**
     * switch type filters
     * @param {array} Arr
     */
    switchFiltersModalEmit(arr) {
      this.$emit('switchFiltersModal', arr);
    },

    /**
     * Show available Items
     */
    setAmount(field) {
      const form = {
        param: field.param,
        amount: field.values
      };
      this.amountModel = form
    },

    /**
     * Delete All filter
     */
    deleteAllFilter() {
      if (this.$route.name === 'search'){
        this.$router.push(`${this.$route.path}?needle=${this.$route.query.needle}`)
      }
      else{
        this.$router.push(`${this.$route.path}`)
      }

      this.closeSheet();
      this.selectedFilters = new Set([])
      this.filterQuery = []
      this.finalFilterObject = []
      this.amountModel = null
      this.stockModel = null
      this.$emit('clearFilterQuery')
    },

    openSheet() {
      this.sheet = true;
    },

    closeSheet() {
      this.sheet = false;
    },


    /**
     * Filter productList by select type items
     * @param {*} array
     */
    selectFiltersModal(array) {
      if (array.param === "stock") {
        this.createQueryForFilter(array)
      } else {
        const findQueryIndex = this.filterQuery.findIndex(query => query.name === array.name);

        if (findQueryIndex > -1) {
          if (array.values.length) this.filterQuery[findQueryIndex].values = array.values
          else this.filterQuery.splice(findQueryIndex, 1)
        } else {
          this.filterQuery.push(array)
        }

        this.createQueryForFilter()
      }

    },

    /**
     * Filter by amount
     * @param {*} amount
     */
    async selectByAmount(amount) {
      if (amount?.param === "site_price") {
        let site_price_to = ''
        let site_price_from = ''

        if (amount?.amount?.from !== null) {
          site_price_from = amount?.amount?.from
        }
        if (amount?.amount?.to !== null) {
          site_price_to = amount?.amount?.to
        }

        let query = this.$route.query;

        if (site_price_from && !site_price_to) {
          this.$router.push({
            query: {
              ...query,
              site_price_from: site_price_from,
            }
          })
        } else if (!site_price_from && site_price_to) {
          this.$router.push({
            query: {
              ...query,
              site_price_to: site_price_to
            }
          })
        } else if (site_price_from && site_price_to) {
          this.$router.push({
            query: {
              ...query,
              site_price_from: site_price_from,
              site_price_to: site_price_to
            }
          })
        }

      }
    }, /**
     * Filter by amount
     * @param {*} amount
     */
    async selectByStock(amount) {
      if (amount?.param === "stock") {
        let query = this.$route.query;

        if (amount?.value ) {
          this.$router.push({
            query: {
              ...query,
              stock: 1,
            }
          })
        } else if (!amount?.value) {
          this.$router.push({
            query: {
              ...query,
              stock: 0
            }
          })
        }

      }
    },

    /**
     * Params generator
     * @param {*} array
     */
    async paramGenerator(array) {
      this.finalFilterObject = []
      const newObject = Object.create(this.filterQuery)
      if (array?.param === "stock") {
        let param = ''
        if (array.values) {
          param = `1`
        } else {
          param = `0`
        }
        let routeSplit = this.$route.fullPath.split('?')
        let query = this.$route.query;
        if (routeSplit[1]) {
          if (this.$route.query?.stock) {
            if (query) {
              this.$router.replace({
                query: {
                  ...query,
                  stock: param,
                  page: 1
                }
              })
            } else {
              this.$router.push({
                query: {
                  stock: param,
                  page: 1
                }
              })
            }

          } else {
            this.$router.replace({
              query: {
                ...query,
                stock: param,
                page: 1
              }
            })
          }
        } else {
          this.$router.push(`${this.$route.path}?stock=${param}`)
        }
      } else {
        await newObject.forEach((query, index) => {
          query.values.forEach(value => {
            const form = {
              param: query.param,
              value: value
            }
            this.finalFilterObject.push(form)
          })
        })
        // this.createRoute(finalFilterObject)
      }
    },

    /**
     * Create route after filter
     * @param {*} values
     */
    createRoute(values) {
      let param = ''
      let colorParam = ''
      let brandParam = ''
      let paramQuery = ''
      let categoryQuery = ''
      let productQuery = ''
      const colorsObject = values.filter(filterValue => filterValue.param == "colors")
      const attributeObject = values.filter(filterValue => filterValue.param == "attributes")
      const brandObject = values.filter(filterValue => filterValue.param == "brands")
      const categoriesObject = values.filter(filterValue => filterValue.param == "categories")
      const productsObject = values.filter(filterValue => filterValue.param == "products")
      attributeObject.forEach(element => {
        param += `attributes[]=${element.value}&`
      })
      brandObject.forEach(element => {
        brandParam += `brands[]=${element.value}&`
      })
      colorsObject.forEach(element => {
        colorParam += `colors[]=${element.value}&`
      })
      categoriesObject.forEach(element => {
        categoryQuery += `categories[]=${element.value}&`
      })
      productsObject.forEach(element => {
        productQuery += `products[]=${element.value}&`
      })

      if (attributeObject.length) {

        let finalParam = `${param.substring(0, param.length - 1)}`
        if (!paramQuery) paramQuery += `?${finalParam}`
        else paramQuery += `&${finalParam}`
      }
      if (brandObject.length) {
        let finalParam = `${brandParam.substring(0, brandParam.length - 1)}`
        if (!paramQuery) paramQuery += `?${finalParam}`
        else paramQuery += `&${finalParam}`
      }
      if (colorsObject.length) {
        let finalParam = `${colorParam.substring(0, colorParam.length - 1)}`
        if (!paramQuery) paramQuery += `?${finalParam}`
        else paramQuery += `&${finalParam}`
      }
      if (categoriesObject.length) {
        let finalParam = `${categoryQuery.substring(0, categoryQuery.length - 1)}`
        if (!paramQuery) paramQuery += `?${finalParam}`
        else paramQuery += `&${finalParam}`
      }
      if (productsObject.length) {
        let finalParam = `${productQuery.substring(0, productQuery.length - 1)}`
        if (!paramQuery) paramQuery += `?${finalParam}`
        else paramQuery += `&${finalParam}`
      }
      if (this.$route.query.site_price_from) {
        if (!paramQuery) paramQuery += `?site_price_from=${this.$route.query.site_price_from}`
        else paramQuery += `&site_price_from=${this.$route.query.site_price_from}`
      }
      if (this.$route.query.site_price_to) {
        if (!paramQuery) paramQuery += `?site_price_to=${this.$route.query.site_price_to}`
        else paramQuery += `&site_price_to=${this.$route.query.site_price_to}`
      }
      if (this.$route.query.stock) {
        if (!paramQuery) paramQuery += `?stock=${this.$route.query.stock}`
        else paramQuery += `&stock=${this.$route.query.stock}`
      }
      if (this.$route.name === 'search'){
        this.$router.push(this.$route.path + paramQuery + `&needle=${this.$route.query.needle}`)
      }
      else{
        this.$router.push(this.$route.path + paramQuery)

      }
      this.query = paramQuery
      setTimeout(() => {
        this.selectByAmount(this.amountModel)
        setTimeout(()=>{
          this.selectByStock(this.stockModel)
        } ,200)
      }, 200)
      this.closeSheet()
      this.$emit('resetPage')
    },

    async createQueryForFilter(array) {
      await this.paramGenerator(array)
    },

  },

  mounted() {
    if (Object.keys(this.$route?.query).length === 0) {
      this.activeFilterButton = false
    } else {
      Object.keys(this.$route?.query).forEach(element => {
        if (element !== 'order' && element !== 'order_type' && element !== 'page') {
          this.activeFilterButton = true
        }
      });
    }
  },

  watch: {
    $route(newVal) {
      if (Object.keys(newVal?.query).length === 0) {
        this.activeFilterButton = false
      } else {
        Object.keys(newVal?.query).forEach(element => {
          if (element !== 'order' && element !== 'order_type' && element !== 'page') {
            this.activeFilterButton = true
          }
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/filter-sidebar.scss";
</style>

<style lang="scss" scoped>
.c-modal {
  &--filter__header {
    background: var(--Shade-white, #FFF);
    box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
  }

  .selected-filters {
    background: #D72685;
    border-color: transparent !important;

    .v-icon,
    span {
      color: #fff !important;
      border-color: #fff !important;
    }

    .number-font {
      font-weight: 700;
    }
  }

  &--filter {
    padding-bottom: 100px !important;
  }
}

.filter-sidebar__card__header {
  span {
    color: #3a3a3a
  }
}

.filter-main-scroll {
  height: calc(100vh - 150px);
  overflow-y: auto;
}

.filter-mobile-btn {
  background: #FFF;
  display: flex;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 36px;

  .v-btn {
    width: 48%;
    border-radius: 12px !important;

    &:first-child {
      margin-left: 4% !important;
    }
  }
}

.c-modal--comment__header__btn {
  width: 25px !important;
  height: 25px !important;
  min-width: auto;
  background: #ececec;
  border-radius: 50%;
  margin: 10px;
}

$parent: 'voucher-auth';

.filter-sheet {
  position: relative;
  overflow: hidden;
  padding-bottom: 16px;

  .game-auth__desc {
    margin-bottom: 20px !important;
  }

  .close-modal {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 32px;
    left: 16px;
    border-radius: 50%;
    background: rgb(207 205 205 / 50%) !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .#{$parent}__code {
    border-radius: 4px;
    border: 1px solid #9E9E9E;
    margin-top: 10px;
    height: 50px;
    padding: 10px;
    color: rgba(90, 89, 89, 0.617);
    font-size: 18px;

    > span:first-child {
      font-size: 15px;
      color: black !important;
    }
  }
}
</style>


<style lang="scss">
.filter-mobile-btn {
  .v-btn__content {
    font-variation-settings: "wght" 700 !important;
    font-size: 14px !important;
  }

  .btn--submit.v-btn--disabled {
    background-color: #BDBDBD !important;

    .v-btn__content {
      color: white !important
    }

    .v-btn__overlay {
      background-color: transparent !important;
    }
  }

  .btn--submit-border {
    &.v-btn--disabled {
      background-color: transparent !important;
      border: 2px solid #BDBDBD !important;

      .v-btn__content, .v-btn__content span {
        color: #BDBDBD !important;
      }

      .v-btn__overlay {
        background-color: transparent !important;
      }
    }
  }
}
</style>