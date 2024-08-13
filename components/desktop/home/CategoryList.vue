<template>
<section class="category-list category-list--desktop">
    <header v-if="sectionLabel && categories && categories.length > 0" class="pt-6 pb-4 mt-6">
        <h2 class="t22 w700 text-center text-sGrayDarken2 ma-0">
            {{ sectionLabel }}
        </h2>
    </header>

    <div class="category-list__items d-flex justify-center">
        <a v-for="item in categories" :key="item.id" :href="item.link" class="category-list__item mb-3">
            <div class="category-list__item__image">
                <img :src="item?.image.image_url" :title="item.label" :alt="item.label" width="72" height="72" />
            </div>

            <h3 v-if="item.label" class="t14 w700 text-center mt-2 text-sGrayDarken2">
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
        items: Object,

        /**
         * Section title
         */
        title: String,
    },

    computed: {
        categories() {
            try {
              const categories = this.items?.banners.filter(category => category.is_active === 1)
                return categories
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
