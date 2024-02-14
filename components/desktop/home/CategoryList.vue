<template>
<section v-if="categories && categories.length" class="category-list category-list--desktop">
    <header v-if="sectionLabel" class="pa-6 mt-6">
        <h2 class="t24 w500 text-center text-grey-darken-2 ma-0">
            {{ sectionLabel }}
        </h2>
    </header>

    <div class="category-list__items d-flex justify-center align-start">
        <a v-for="item in categories" :key="item.id" :href="item.link" class="category-list__item mb-3">
            <div class="category-list__item__image">
                <img :src="item?.image.image_url" :title="item.label" :alt="item.label" width="90" height="90" />
            </div>

            <h3 v-if="item.label" class="t12 w400 text-center mt-2 text-grey-darken-2">
                {{item.label}}
            </h3>
        </a>
    </div>
</section>
</template>

<script>
export default {
    props: {
        /**
         * Item list
         */
        items: Array,

        /**
         * Section title
         */
        title: String,
    },

    computed: {
        categories() {
            try {
                return this.items ?.banners
            } catch (e) {
                return []
            }
        },
        sectionLabel() {
            try {
                return this.items ?.label
            } catch (e) {
                return ''
            }
        }
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/desktop/home/category-list.scss';
</style>
