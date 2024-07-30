<template>
<nav class="filter-sidebar__card__box">
    <ul class="w-100 ma-0 pa-0">
        <li
            v-for="(value, index) in items"
            :key="`cat${index}`"
            @click="chooseItem(value.slug)"
            class="t12 w700 text-grey pa-1 mb-1">
            {{value.label}}
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    props: {
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

        /**
         * Name of filter
         */
         name: String,
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
         chooseItem(slug) {
          this.$router.push(`/category/${slug}`)
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
