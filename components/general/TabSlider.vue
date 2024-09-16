<template>
<section class="tab-slider mb-4" :class="getDynamicClasses" :ref="setRef">
    <header v-if="title" class="text-right" :class="device === 'desktop' ? 't20 text-sGrayDarken2 py-4 w700' : 't16 text-sGrayDarken2 pt-6 pb-1 w700'">
        {{title}}
    </header>

    <div>
        <nav class="tab-slider__header">
            <ul class="ma-0 pa-0">
                <li v-for="(tab, index) in categories" :key="`tab-slider__${index}`" @click="activeTab(tab.id,tab.label)" :id="`tab-header-${tab.id}`" class="tab-slider__header__item" :class="index == 0 ? 'active' : ''">
                    <span>{{tab.label}}</span>

                    <v-icon v-if="columnHeader" icon="mdi-chevron-left" color="grey" />
                </li>
            </ul>
        </nav>

        <div class="tab-slider__contents py-2">
            <div v-for="(item, index) in categories" class="tab-slider__content" :class="{ 'active': index === 0, 'flex-wrap': wrapContent, 'd-flex': mobileMode === false }" :key="`tab-content-${item.id}`" :id="`tab-content-${item.id}`" :style="mobileMode ? '' : { width: `${contentWidth}`, flex:`0 0 ${contentWidth}`}">
                <template v-if="mobileMode">
                    <swiper dir="rtl" :slidesPerView="6" :spaceBetween="8" :modules="modules" :navigation="device === 'desktop' ? true : false" :breakpoints="{
                        '200': {
                            slidesPerView: 2.3,
                        },
                        '500': {
                            slidesPerView: 2.8,
                        },
                        '650': {
                            slidesPerView: 3.2,
                        },
                        '768': {
                            slidesPerView: 4.2,
                        },
                        '992': {
                            slidesPerView: 5.2,
                        },
                        '1200': {
                            slidesPerView: 6.2,
                        },
                        '1398': {
                            slidesPerView: 7.2,
                        }
                    }" class="mySwiper py-3 w-100">
                            <swiper-slide v-for="(sku , skuIndex) in getSkuList(item ,limit)" :key="`tab-skus-${sku.id}`">
                                <component :cardIdLabel="`home-${screenId}-${items?.id}-${index+1}-${skuIndex +1}-label`"
                                           :cardIdImage="`home-${screenId}-${items?.id}-${index+1}-${skuIndex +1}-image`"
                                           class="w-100 h-100" :is="component" :index="index+1" :sectionName="`${title} - ${selectedTab}`" v-bind=componentProps :content="sku" />
                            </swiper-slide>
                    </swiper>
                </template>

                <component v-else v-for="sku in getSkuList(item ,limit)" :key="`tab-skus-${sku.id}`" :is="component" :index="index+1" :sectionName="`${title} - ${selectedTab}`" v-bind=componentProps :content="sku" />
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    resolveComponent
} from 'vue';

// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import {
    FreeMode,
    Navigation
} from 'swiper/modules';

export default {
    data() {
        return {
            headerItems: [],
            tabContents: null,
            selectedTab: null,
        }
    },

    props: {
        /**
         * List of item
         */
        items: Object,

        /**
         * section title
         */
        title: String,

        /**
         * Header be in an column near the content
         */
        columnHeader: {
            type: Boolean,
            default: false
        },

        /**
         * Content width for horizontal scroll
         */
        contentWidth: {
            type: String,
            default: '948px'
        },

        /**
         * Get child component name
         */
        componentName: {
            type: String,
            default: 'generalProductCard'
        },

        /**
         * Get child component props
         */
        componentProps: {
            type: Object,
            default: {},
        },

        /**
         * Set flex wrap for `.tab-slider__content`
         */
        wrapContent: {
            type: Boolean,
            default: false
        },

        /**
         * Set limit for max of show content
         */
        limit: {
            type: String,
            default: "5"
        },

        setRef: {
            type: String,
            default: 'tab1'
        },

        /**
         * device
         */
        device: {
            type: String,
            default: "desktop"
        },

        /**
         * Set mobile view in desktop view
         */
        mobileMode: {
            type: Boolean,
            default: false
        },

        /**
         * screenId
         */
        screenId: {
          type:String,
          default:'D'
        },
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup(props) {
        const {
            componentName
        } = props;
        const component = resolveComponent(componentName);

        return {
            component,
            modules: [FreeMode, Navigation],
        };
    },

    computed: {
        /**
         * Set dynamic class based my props
         */
        getDynamicClasses() {
            return {
                'column-header': this.columnHeader,
                'mobile-mode': this.mobileMode
            };
        },

        categories() {
            try {
                this.selectedTab = this.items.categories[0] ?.label
                return this.items.categories.slice(0, 6)
            } catch (e) {
                return []
            }
        }
    },

    methods: {
        getSkuList(item, limit) {
            const skus = item.skus.slice(0, limit)
            const findSkus = skus.filter(sku => sku ?.seller_s_k_us ?.length && sku ?.seller_s_k_us[0] ?.site_stock > 0)
            return findSkus
        },
        /**
         * Active tabs by click
         */
        activeTab(id, label) {
            //**out of your component should set ref**
            const slider = this.$refs[this.setRef];
            this.selectedTab = label

            const liItems = slider.querySelectorAll('li');
            const tabContents = slider.querySelectorAll('div.tab-slider__content');

            liItems.forEach(item => {
                item.classList.remove('active');
                slider.querySelector(`#tab-header-${id}`).classList.add('active');
            });

            tabContents.forEach(item => {
                item.classList.remove('active');
                slider.querySelector(`#tab-content-${id}`).classList.add('active');
            });
        }
    },

}
</script>

<style>
@import '~/assets/scss/components/general/tab-slider.scss';
</style>
