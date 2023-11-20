<template lang="">
<section v-if="items && items.length" class="category-list category-list--mobile">
    <header class="t20 text-center text-grey-darken-2 pa-3">
        دسته‌بندی‌ها
    </header>

    <div  class="category-list__items d-flex justify-center align-start">
        <a
            v-for="item in items"
            :key="item.id"
            :href="item.link"
            class="category-list__item mb-3">
            <div class="category-list__item__image">
                <img :src="imageAddress('home-category.jpg')" :title="item.title" :alt="item.title" width="90" height="90" />
            </div>

            <h3 v-if="item.title" class="t12 w400 text-center mt-2 text-grey-darken-2">
                {{item.title}}
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
        title:String,
    },

    methods: {
        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        }
    },

}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/category-list.scss';
</style>
