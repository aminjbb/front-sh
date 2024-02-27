<template>
<div class="c-modal w-100">
    <div class="w-100 d-flex justify-start align-center mt-3" @click="openModal()">
        <v-icon
            icon="mdi-filter-outline"
            color="grey-darken-2"
            class="mr-1" />

        <span class="text-grey-darken-2 t13 w500">فیلتر</span>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        fullscreen>
        <v-card class="pt-2 pb-5 c-modal--filter">
            <header class="c-modal--filter__header d-flex justify-space-between align-center pb-1 px-6 ">
                <div class="d-flex flex-column c-modal--filter__header__title">
                    <span class="t16 w400 mb-1">
                        فیلتر
                    </span>
                </div>

                <span class="t13 text-grey-darken-1 py-3" @click="deleteAllFilter()">
                    حذف همه
                </span>
            </header>

            <div class="px-3">
                <template v-for="(filter, index) in filterList" :key="`filter${index}`">

                    <div class="filter-sidebar__card" :id="`filter-sidebar__card--${index}`">
                        <header
                            v-if="filter.type !== 'switch'"
                            class="d-flex align-center justify-space-between filter-sidebar__card__header my-4"
                            @click="slideToggleCard(index)">
                            <span class="t16 w400 text-grey-darken-2">{{filter.name}}</span>

                            <v-icon icon="mdi-chevron-down" color="grey" />
                        </header>

                      <template v-if="filter.type === 'select'">
                            <generalProductFilterList
                                :items="filter.data"
                                :clear="clearAll"
                                :name="filter.name"
                                :param="filter.param"
                                @listItems="listFiltersModalEmit" />
                        </template>

                        <template v-else-if="filter.type === 'switch'">
                            <generalProductFilterSwitch
                                :title="filter.name"
                                :clear="clearAll"
                                :name="filter.name"
                                :param="filter.param"
                                :switchName="filter.value" />
                        </template>

                        <template v-else-if="filter.type === 'checkbox'">
                            <generalProductFilterSelects
                                :items="filter.data"
                                :title="filter.name"
                                :name="filter.name"
                                :param="filter.param"
                                :clear="clearAll"
                                @selectItems="selectFiltersModalEmit" />
                        </template>
                    </div>

                    <v-divider color="grey" />
                </template>

                <div class="filter-sidebar__card mt-3" :id="`filter-sidebar__card--${filterList.length}`">
                    <header class="d-flex align-center justify-space-between filter-sidebar__card__header mb-5" @click="slideToggleCard(filterList.length)">
                        <span class="t16 w400 text-grey-darken-2">محدوده قیمت</span>

                        <v-icon icon="mdi-chevron-down" color="grey" />
                    </header>

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
                                @keydown.enter="setAmount"
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
                                @keydown.enter="setAmount"
                                v-model="amount.max"
                                :custom-filter="customMaxFilter"
                                height="40px"
                                class="mb-3 filter-sidebar__card__search" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-mobile-btn pa-3">
                <v-btn
                    @click="closeModal()"
                    height="44"
                    title=" مشاهده نتایج"
                    class="btn btn--submit w-100">
                    مشاهده نتایج
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            selectedItem: null,
            availableItems: false,
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
          console.log(arr , 'selectFiltersModalEmit')
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
        setAmount() {
            this.$emit('setAmount', this.amount);
        },

        /**
         * Delete All filter
         */
        deleteAllFilter(){
            this.$emit('deleteAllFilter');
            this.closeModal();
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/filter-sidebar.scss";
</style>

<style lang="scss" scoped>
.c-modal--filter__header {
    background: var(--Shade-white, #FFF);
    box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
}

.c-modal--filter{
    padding-bottom:100px !important;
}

.filter-mobile-btn {
    border-radius: 8px 8px 0px 0px;
    background: #FFF;
    box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
    display: flex;
    align-items: center;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 36px;
}
</style>
