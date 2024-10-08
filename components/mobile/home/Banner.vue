<template >
<div v-if="items && items.length" class="banner banner--mobile">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>
    <div v-if="scroll" class="banner__scroll scroll--x scroll--x--hide">
        <div class="d-flex align-center">
            <div
                class="banner__item"
                v-for="(item , index) in items"
                :key="item.id"
                @click="enhanceECommerce(item)">
                <a class="banner__image d-block" :href="item.link" :id="`home-${screenId}-${sectionId}-${index + 1}`">
                    <img :src="item.image?.image_url" title="بنرهای تبلیغاتی فروشگاه شاواز" alt="بنرهای تبلیغاتی فروشگاه شاواز"  width="300" height="200" />
                </a>
            </div>
        </div>
    </div>

    <v-row v-else :class="device === 'mobile' ? 'ma-0' : ''">
        <v-col
            v-for="(item , index) in items"
            :key="item.id"
            :cols="generalCol"
            :class="device === 'mobile' ? 'pa-1' : ''"
            @click="enhanceECommerce(item)"
            :sm="col">
            <a class="banner__image d-flex" :href="item.link" :id="`home-${screenId}-${sectionId}-${index + 1}`">
                <img class="d-block" :src="item.image?.image_url" title="بنرهای تبلیغاتی فروشگاه شاواز" alt="بنرهای تبلیغاتی فروشگاه شاواز"  width="380" height="200" />
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
         * Col number for show in mobile
         */
        generalCol: {
            type: String,
            default: '12'
        },

        /**
         * Section title
         */
        title: String,

        /**
         * Active scroll in mobile Size
         */
         scroll: {
            type: Boolean,
            default: false
         },

         /**
         * device
         */
         device: {
            type: String,
            default: "desktop"
        },
        /**
         * screenId
         */
        screenId: {
          type:String,
          default:'D'
        },
        /**
         * sectionId for id
         */
        sectionId: {
          type: String,
          default: ''
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
@import '~/assets/scss/components/mobile/home/banner.scss';
</style>
