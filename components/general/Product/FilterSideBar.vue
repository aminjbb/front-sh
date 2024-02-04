<template>
<div class="filter-sidebar">
    <header class="d-flex align-center justify-space-between mb-5">
        <span class="t20 w400 text-grey-darken-3">فیلتر</span>

        <div class="t12 w400 text-grey-darken-1" @click="removeAllFilter()">حذف همه</div>
    </header>
    <template v-for="(filter, index) in filterList" :key="`filter${index}`">

        <div class="filter-sidebar__card" :id="`filter-sidebar__card--${index}`">
            <header
                v-if="filter.type !== 'switch'"
                class="d-flex align-center justify-space-between filter-sidebar__card__header my-4"
                @click="slideToggleCard(index)">
                <span class="t16 w400 text-grey-darken-2">{{filter.name}}</span>

                <v-icon icon="mdi-chevron-down" color="grey" />
            </header>

            <template v-if="filter.type === 'list'">
                <generalProductFilterList
                    :items="filter.data"
                    :clear="clearAll"
                    :name="filter.name"
                    @listItems="listFiltersModalEmit" />
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
                    :title="filter.label"
                    :param="filter.param"
                    :name="filter.name"
                    :clear="clearAll"
                    @selectItems="selectFiltersModalEmit" />
            </template>
            <template v-else-if="filter.type === 'period'">
              <div class="filter-sidebar__card mt-3" :id="`filter-sidebar__card--${filterList.length}`">

                <div class="filter-sidebar__card__box">
                  <div class="d-flex align-center justify-space-between">
                    <span class="t14 w400 ml-5">حداقل</span>

                    <v-autocomplete
                        density="compact"
                        variant="outlined"
                        placeholder="مثلا 10,000"
                        :items="amounts"
                        item-title="label"
                        item-value="value"
                        suffix="تومان"
                        @blur="setAmount(filter.param)"
                        v-model="amount.min"
                        :custom-filter="customMinFilter"
                        height="40px"
                        class="mb-3 filter-sidebar__card__search" />
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
                        @blur="setAmount(filter.param)"
                        v-model="amount.max"
                        :custom-filter="customMaxFilter"
                        height="40px"
                        class="mb-3 filter-sidebar__card__search" />
                  </div>
                </div>
              </div>
            </template>
        </div>

        <v-divider color="grey" />
    </template>


</div>
</template>

<script>
export default {
    data() {
        return {
            availableItems: false,
            amount: {
                max: null,
                min: null
            },
            amounts: [{
                    label: '10 هزار',
                    value: '10'
                },
                {
                    label: '25 هزار',
                    value: '25'
                },
                {
                    label: '50 هزار',
                    value: '50'
                },
                {
                    label: '100 هزار',
                    value: '100'
                },
                {
                    label: '150 هزار',
                    value: '150'
                },
                {
                    label: '200 هزار',
                    value: '200'
                },
                {
                    label: '250 هزار',
                    value: '250'
                },
                {
                    label: '300 هزار',
                    value: '300'
                }
            ],
        }
    },

    props: {
        filterList: Array,

    },

    computed: {},

    methods: {
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
         * Enter the desired value
         * @param {*} item 
         * @param {*} queryText 
         */
        customMinFilter(queryText) {
            this.amount.min = queryText

        },

        /**
         * Enter the desired value
         * @param {*} item 
         * @param {*} queryText 
         */
        customMaxFilter(queryText) {
            this.amount.max = queryText
        },

        /**
         * Show available Items
         */
        setAmount(param) {
            const form = {
              param :param,
              amount : this.amount
            }
            this.$emit('setAmount', form);
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/filter-sidebar.scss";
</style>
