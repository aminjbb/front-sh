<template >
<div class="banner banner--desktop">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>

    <v-row>
        <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            @click="goToLink(item)"
            :sm="col">
            <a class="banner__image mb-3 d-block cur-p">
                <img :src="item.image?.image_url" title="بنرهای تبلیغاتی سایت شاواز" alt="بنرهای تبلیغاتی سایت شاواز" width="600" height="400" />
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
         * Section title
         */
        title: String
    },

    methods:{
         /**
         * Enhance E-commerce for Seo in Checkout Step 4 after payment
         */
         goToLink(banner){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'select_banner',
                banner_name: banner.image_alt,		// name of the promo campaign
                banner_location: banner.homepage_section_id	
            });
            window.location = banner.link;
        },
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/desktop/home/banner.scss';
</style>
