<template>
<div class="filter-sidebar" ref="refSidebar">
    <header class="d-flex align-center justify-space-between mb-5">
        <div class="d-flex align-center">
            <v-icon icon="mdi-filter-outline" color="color-3c" class="ml-1" style="font-size: 19px !important;" />
            <span class="t16 w700 color-3c">فیلتر</span>
        </div>

        <v-btn class="filter-sidebar__btn btn btn--submit-border" heigh="34px" @click="removeAllFilter()" :disabled="activeDeleteButton === true ? false : true">
            <span class="t12 w700 text-primary pointer">حذف فیلترها</span>
        </v-btn>
    </header>

    <v-divider color="grey" />

    <template v-for="(filter, index) in filterList" :key="`filter${index}`">
        <div class="filter-sidebar__card" :id="`filter-sidebar__card--${index}`">
            <header v-if="filter.type !== 'switch'" class="d-flex align-center justify-space-between filter-sidebar__card__header py-4" @click="slideToggleCard(index)">
                <span class="t12 w700 color-3c">{{ filter.label }}</span>

                <div class="d-flex align-center">
                    <!--                  <v-icon size="5" icon="mdi-checkbox-blank-circle" color="success" />-->
                    <v-badge v-if="returnShowBadgeFilter(index)" color="primary" dot class="ml-2 mb-2" />
                    <v-icon icon="mdi-chevron-down" color="grey" />
                </div>
            </header>

            <template v-if="filter.type === 'select'">
                <generalProductFilterSelects :isSearchable="filter.is_searchable" @removeSelectedFilter="removeSelectedFilterForShowBadge" @selectedFilter="addSelectedFilterForShowBadge" :index="index" :ShowEnName="filter.param === 'categories' || filter.param === 'products' ? false : true" :items="filter.data" :clear="clearAll" :title="filter.label" :name="filter.label" :param="filter.param" @selectItems="selectFiltersModalEmit" @changeClearToFalse="changeClearToFalse" />
            </template>

            <template v-else-if="filter.type === 'switch'">
                <generalProductFilterSwitch  :index="index" style="margin: 0 !important;" :title="filter.label" :param="filter.param" :name="filter.label" :clear="clearAll" :switchName="filter.value" @changeStatus="selectFiltersModalEmit" @changeClearToFalse="changeClearToFalse" />
            </template>

            <template v-else-if="filter.type === 'checkbox'">
                <generalProductFilterSelects :isSearchable="filter.is_searchable"  @removeSelectedFilter="removeSelectedFilterForShowBadge" @selectedFilter="addSelectedFilterForShowBadge" :index="index" :ShowEnName="filter.param === 'categories' || filter.param === 'products' ? false : true" :items="filter.data" :title="filter.label" :param="filter.param" :name="filter.label" :clear="clearAll" @selectItems="selectFiltersModalEmit" @changeClearToFalse="changeClearToFalse" />
            </template>

            <template v-else-if="filter.type === 'period'">
                <div>
                    <generalProductFilterSelectsMount :isSearchable="filter.is_searchable" :index="index" @selectItems="updateAmount" :isFilter="filter.is_searchable" :items="filter?.data" :title="filter.label" @selectedFilter="addSelectedFilterForShowBadge" :clear="clearAll" :param="filter.param" :name="filter.label" @changeClearToFalse="changeClearToFalse" />
                </div>
            </template>
        </div>

        <v-divider v-if="index < (filterList.length - 1)" color="grey" />
    </template>

</div>
</template>

<script>
export default {
    data() {
        return {
            availableItems: false,
            activeDeleteButton:false,
            searchInput: '',
            amount: {
                max: null,
                min: null
            },
            selectedFilters: new Set([]),
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
            clearAll: false,
        }
    },

    props: {
        filterList: Array,
    },

    methods: {

        /**
         * Toggle card box
         * @param {*} id
         */
        slideToggleCard(id) {
            const sidebarTab = this.$refs['refSidebar'];

            const divItems = sidebarTab.querySelectorAll('div.filter-sidebar__card');

            divItems.forEach(item => {
                if (item.id !== `filter-sidebar__card--${id}` && item.id !== `filter-sidebar__card--status`) {
                    if (item.querySelector('.filter-sidebar__card__box')) {
                        if (item.querySelector('.filter-sidebar__card__box').classList.contains('open-card')) {
                            item.querySelector('.filter-sidebar__card__box').classList.remove('open-card');
                            const hasClass = item.querySelector('.v-icon.mdi-chevron-down').classList.contains('mdi-chevron-up')
                            if (hasClass) {
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
        updateAmount(field) {
            const form = {
                param: field.param,
                amount: field.values
            };
            this.$emit('setAmount', form);
        },
        /**
         * Remove Filter For PLP Page
         */
        removeAllFilter() {
          if (this.$route.name == 'search'){
            this.$router.push(`${this.$route.path}?needle=${this.$route.query.needle}`)
          }
          else{
            this.$router.push(`${this.$route.path}`)
          }

            this.clearAll = true
            this.selectedFilters = new Set([])
            this.$emit('clearFilterQuery')
        },

        /**
         * change clear
         */
        changeClearToFalse() {
            this.clearAll = false
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
    },

    mounted() {
        if (Object.keys(this.$route ?.query).length === 0) {
            this.activeDeleteButton = false
        } else{
            Object.keys(this.$route ?.query).forEach(element => {
                if(element !== 'order' && element !== 'order_type' && element !== 'page'){
                    this.activeDeleteButton = true
                }
            });
        }
    },

    watch: {
        $route(newVal) {
            if (Object.keys(newVal ?.query).length === 0) {
                this.activeDeleteButton = false
            } else{
                Object.keys(newVal ?.query).forEach(element => {
                    if(element !== 'order' && element !== 'order_type' && element !== 'page'){
                        this.activeDeleteButton = true
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
