<template>
  <div class="filter-sidebar" ref="refSidebar">
    <header class="d-flex align-center justify-space-between mb-5">
      <span class="t18 w400 text-grey-darken-3">فیلتر</span>
      <v-btn variant="text" @click="removeAllFilter()">
        <span class="t12 w400 text-grey-darken-1 pointer">حذف همه</span>
      </v-btn>
    </header>
    <template v-for="(filter, index) in filterList" :key="`filter${index}`">
      <div class="filter-sidebar__card" :id="`filter-sidebar__card--${index}`">
        <header
            v-if="filter.type !== 'switch'"
            class="d-flex align-center justify-space-between filter-sidebar__card__header my-4"
            @click="slideToggleCard(index)">
          <span class="t15 w400 text-grey-darken-2">{{ filter.name }}</span>

          <v-icon icon="mdi-chevron-down" color="grey"/>
        </header>

        <template v-if="filter.type === 'select' ">
          <generalProductFilterList
              :items="filter.data"
              :clear="clearAll"
              :param="filter.param"
              :name="filter.name"
              @listItems="listFiltersModalEmit"/>
        </template>

        <template v-else-if="filter.type === 'switch'">
          <generalProductFilterSwitch
              :title="filter.name"
              :param="filter.param"
              :name="filter.name"
              :clear="clearAll"
              :switchName="filter.value"
              @changeStatus="selectFiltersModalEmit"
          />
        </template>

        <template v-else-if="filter.type === 'checkbox'">
          <generalProductFilterSelects
              :items="filter.data"
              :title="filter.name"
              :param="filter.param"
              :name="filter.name"
              :clear="clearAll"
              @selectItems="selectFiltersModalEmit"/>
        </template>
        
        <template v-else-if="filter.type === 'period'">
          <div>

            <div class="filter-sidebar__card__box">
              <div class="d-flex align-center justify-space-between mb-3">
                <span class="t14 w400 ml-5">حداقل</span>

                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    placeholder="مثلا 10,000"
                    :items="amounts"
                    item-title="label"
                    item-value="value"
                    suffix="تومان"
                    ref="minAmount"
                    @update:modelValue="updateAmount('min', $event, filter.param)"
                    v-model="amount.min"
                    @update:menu="onUpdateMenu"
                    height="40px"
                    hide-details
                    class="mb-3 filter-sidebar__card__search"/>
              </div>

              <div class="d-flex align-center justify-space-between">
                <span class="t14 w400 ml-5">حداکثر</span>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    placeholder="مثلا 10,000"
                    :items="amounts"
                    item-title="label"
                    item-value="value"
                    suffix="تومان"
                    @update:modelValue="updateAmount('max', $event, filter.param)"
                    v-model="amount.max"
                    @update:menu="onUpdateMenu"
                    height="40px"
                    hide-details
                    class="mb-3 filter-sidebar__card__search"/>
              </div>
            </div>
          </div>
        </template>
      </div>

      <v-divider color="grey"/>
    </template>


  </div>
</template>

<script>
export default {
  data() {
    return {
      availableItems: false,
      searchInput:'',
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

  },

  methods: {

    /**
     * Toggle card box
     * @param {*} index
     */
    slideToggleCard(id) {
      const sidebarTab = this.$refs['refSidebar'];

        const divItems = sidebarTab.querySelectorAll('div.filter-sidebar__card');

        divItems.forEach(item => {
          if(item.id !== `filter-sidebar__card--${id}` && item.id !== `filter-sidebar__card--status`){
            if(item.querySelector('.filter-sidebar__card__box')){
              if(item.querySelector('.filter-sidebar__card__box').classList.contains('open-card')){
                item.querySelector('.filter-sidebar__card__box').classList.remove('open-card');
                const hasClass = item.querySelector('.v-icon.mdi-chevron-down').classList.contains('mdi-chevron-up')
                if(hasClass){
                  item.querySelector('.v-icon.mdi-chevron-down').classList.remove('mdi-chevron-up')
                }
              }
            }
          }
        });

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
      this.$emit('selectFiltersModal', arr);
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
     updateAmount(field, value, param) {
      this.amount[field] = value;
      const form = {
        param: param,
        amount: this.amount
      };
      this.$emit('setAmount', form);
    },
    /**
     * Remove Filter For PLP Page
     */
    removeAllFilter() {
      this.$router.push(`${this.$route.path}`)
    },

    /**
     * Fix bug for select in c-select
     */
      onUpdateMenu(open) {
        if (open) {
            // WORKAROUND: fixes dialog menu popup position
            setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
        }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/filter-sidebar.scss";
</style>
