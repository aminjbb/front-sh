<template lang="">
<div class="filter-sidebar">
    <header class="d-flex align-center justify-space-between mb-5">
        <span class="t20 w400 text-grey-darken-3">فیلتر</span>

        <div class="t12 w400 text-grey-darken-1" @click="removeAllFilter()">حذف همه</div>
    </header>

    <div class="filter-sidebar__card" id="filter-sidebar__card--1">
        <header class="d-flex align-center justify-space-between filter-sidebar__card__header" @click="slideToggleCard('1')">
            <span class="t16 w400 text-grey-darken-2">دسته‌بندی</span>

            <v-icon icon="mdi-chevron-down" color="grey" />
        </header>

        <nav class="filter-sidebar__card__box">
            <ul class="w-100 ma-0 pa-0 pt-2">
                <li
                    v-for="(category, index) in categories"
                    :key="`cat${index}`"
                    @click="chooseCategory(category.id)"
                    class="t14 w400 text-grey pa-1 mb-1">
                    {{category.title}}
                </li>
            </ul>
        </nav>
    </div>

    <v-divider color="grey mt-3" />

    <div class="filter-sidebar__card my-2 filter-sidebar__card--status">
        <div class="d-flex justify-space-between align-center">
            <span class="t16 w400 text-grey-darken-2">فقط کالاهای موجود</span>

            <v-switch
                v-model="availableItems"
                inset
                color="success"
                hide-details
                @change="changeStatus()" />
        </div>
    </div>

    <v-divider color="grey" class="mt-3" />

    <div class="filter-sidebar__card mt-3" id="filter-sidebar__card--2">
        <header class="d-flex align-center justify-space-between filter-sidebar__card__header mb-5" @click="slideToggleCard('2')">
            <span class="t16 w400 text-grey-darken-2">برند</span>

            <v-icon icon="mdi-chevron-down" color="grey" />
        </header>

        <div class="filter-sidebar__card__box">
            <v-text-field
                density="compact"
                variant="outlined"
                placeholder="جستجو برند"
                hide-details
                height="40px"
                prepend-inner-icon="mdi-magnify"
                class="mb-3 filter-sidebar__card__search"
                v-model="searchBrand" />

            <div class="filter-sidebar__card__scroll pl-2 pt-1">
                <template v-for="brand in filteredBrands" :key="brand.id">
                    <div class="d-flex justify-space-between align-center">
                        <v-checkbox
                            v-model="brandsModel"
                            :label="brand.label"
                            @change="selectBrands()"
                            hide-details
                            :value="brand.id" />

                        <span class="t11 w500 text-grey-lighten-1">{{brand.name}}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <v-divider color="grey" />

    <div class="filter-sidebar__card mt-3" id="filter-sidebar__card--3">
        <header class="d-flex align-center justify-space-between filter-sidebar__card__header mb-5" @click="slideToggleCard('3')">
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
</template>

<script>
export default {
    data() {
        return {
            availableItems: false,
            brandsModel: [],
            searchBrand: null,
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
            ]
        }
    },

    props: {
        /**
         * Category list
         */
        categories: Array,

        /**
         * Brand list
         */
        brands: Array
    },

    computed: {
        /**
         * Filter brands by search and sort
         */
        filteredBrands() {
            if (this.searchBrand == null || this.searchBrand == '') {
                return this.brands.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                const lowerCaseSearch = this.searchBrand.toLowerCase();
                return this.brands
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .filter(
                        (brand) =>
                        brand.label.toLowerCase().includes(lowerCaseSearch) ||
                        brand.name.toLowerCase().includes(lowerCaseSearch)
                    );
            }
        },
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
         * Select category
         * @param {*} id 
         */
        chooseCategory(id) {
            this.$emit('selectByCategory', id);
        },

        /**
         * Select by brands
         * @param {array} brandArr 
         */
        selectBrands() {
            this.$emit('selectByBrands', this.brandsModel);
        },
            

        /**
         * Show available Items
         */
        changeStatus() {
            this.$emit('changeStatus', this.availableItems);
        },

        /**
         * Enter the desired value
         * @param {*} item 
         * @param {*} queryText 
         */
        customMinFilter(item, queryText) {
            this.amount.min = queryText

        },

        /**
         * Enter the desired value
         * @param {*} item 
         * @param {*} queryText 
         */
        customMaxFilter(item, queryText) {
            this.amount.max = queryText

        },

        /**
         * Show available Items
         */
        setAmount() {
            this.$emit('setAmount', this.amount);
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/filter-sidebar.scss";
</style>
