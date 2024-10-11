<template>
<section v-if="categories && categories.length" class="category-list category-list--mobile">
    <header v-if="sectionLabel" class="pa-3 mt-3">
        <h2 class="t16 w700 text-center text-sGrayDarken2">
            {{ sectionLabel }}
        </h2>
    </header>

    <div class="category-list__items d-flex justify-center align-start">
        <a v-for="item in categories.slice(0,8)" :key="item.id" :href="item.link" class="category-list__item mb-3 d-flex flex-column align-center">
            <div class="category-list__item__image">
              <generalKitsImageSimage :src="item?.image.image_url" :title="item.label"  :alt="item.image_alt" width="90" height="90" />

            </div>

            <h3 v-if="item.label" class="t10 w700 text-center text-sGrayDarken2">
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
@import '~/assets/scss/components/mobile/home/category-list.scss';
</style>
