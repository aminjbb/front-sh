<template >
<div class="banner banner--desktop">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>

    <v-row>
        <v-col
            v-for="(item , index) in items"
            :key="item.id"
            cols="12"
            @click="enhanceECommerce(item)"
            :sm="col">
            <a class="banner__image mb-3 d-block" :href="item.link" :id="`home-${screenId}-${sectionId}-${index + 1}`">
              <generalKitsImageSimage :src="item?.image.image_url" :title="item.label"  :alt="item.image_alt" width="600" height="400"  />

            </a>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Item list
         */
        items: null,

        /**
         * Col number for show in desktop
         */
        col: {
            type: String,
            default: '6'
        },
        /**
         * sectionId for id
         */
        sectionId: {
            type: String,
            default: ''
        },

        /**
         * Section title
         */
        title: String,
        /**
         * screenId
         */
        screenId: {
          type:String,
          default:'D'
        },
    },

    methods:{
         /**
         * Enhance E-commerce for Seo in Checkout Step 4 after payment
         */
         enhanceECommerce(banner){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'select_banner',
                banner_name: banner.image_alt,		// name of the promo campaign
                banner_location: banner.homepage_section_id	
            });
        },
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/desktop/home/banner.scss';
</style>
