<template lang="">
<div class="filter-sidebar__card__box">
    <v-text-field
        density="compact"
        variant="outlined"
        :placeholder="`جستجو ${title}`"
        hide-details
        height="40px"
        prepend-inner-icon="mdi-magnify"
        class="mb-3 filter-sidebar__card__search"
        v-model="searchItem" />

    <div class="filter-sidebar__card__scroll pl-2 pt-1">
        <template v-for="item in filteredItems" :key="item.id">
            <div class="d-flex justify-space-between align-center">
                <v-checkbox
                    v-model="itemsModel"
                    :label="item.label"
                    @change="selectItems()"
                    hide-details
                    :value="item.id" />

                <span class="t11 w500 text-grey-lighten-1">{{item.name}}</span>
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
         * List of item
         */
        items: Array,

        /**
         * Clear modal if 'clear' be true
         */
        clear: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        /**
         * Filter Items by search and sort
         */
        filteredItems() {
            if (this.searchItem == null || this.searchItem == '') {
                return this.items.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                const lowerCaseSearch = this.searchItem.toLowerCase();
                return this.items
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .filter(
                        (brand) =>
                        brand.label.toLowerCase().includes(lowerCaseSearch) ||
                        brand.name.toLowerCase().includes(lowerCaseSearch)
                    );
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

}
</script>
