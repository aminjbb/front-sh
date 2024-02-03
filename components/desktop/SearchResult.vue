<template lang="">
<div class="header__search-box" id="header__search-box">
    <div class="header__search-box__inner d-flex align-center w-100 px-2">
        <v-icon
            icon="mdi-magnify"
            color="grey-darken-1"
            class="ml-2" />
        <input placeholder="جستجو در شاواز " class="w-100" @click="openSearchbox()" v-model="search" @input="searchProducts" />
    </div>

    <div class="search-result" id="search-result">
        <v-divider color="primary" />
        <div class="search-result__most-search">
            <h5 class="t13 w400 text-grey-darken-3 mb-1 mt-5">بیشترین جستجوهای اخیر</h5>
            <swiper
                dir="rtl"
                :slidesPerView="'auto'"
                :spaceBetween="8"
                :modules="modules"
                :navigation="true"
                class="mySwiper">
                <swiper-slide v-for="(item, index) in mostSearchItemsMoc" :key="`most-search-${index}`">
                    <a class="search-result__most-search__item t12 w400 px-3 py-1 bg-grey-lighten-3 text-grey-darken-2" :href="`/sku/${item.slug}`">
                        {{item.label}}
                    </a>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</div>
</template>

<script>
// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import {
    Navigation
} from 'swiper/modules';

export default {
    data() {
        return {
            search: null,
            mostSearchItems: [],
            mostSearchItemsMoc: [{
                    label: 'سرم ویتامین C',
                    slug: ''
                },
                {
                    label: 'کرم کوشن',
                    slug: ''
                },
                {
                    label: 'رژگونه شیگلم',
                    slug: ''
                },
                {
                    label: 'تینت لب',
                    slug: ''
                },
                {
                    label: 'چسب مو',
                    slug: ''
                },
                {
                    label: 'عطر و ادکلن اورجینال',
                    slug: ''
                },
                {
                    label: 'تقویت کننده ناخن',
                    slug: ''
                }
            ]
        }
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        return {
            modules: [Navigation],
        };
    },

    mounted() {
        document.addEventListener('click', this.closeSearchBox);
    },

    beforeDestroy() {
        document.removeEventListener('click', this.closeSearchBox);
    },

    methods: {
        /**
         * Open search box
         */
        openSearchbox() {
            document.getElementById('header__search-box').classList.add('active')
        },

        /**
         * Close search box if I click in outside
         * @param {*} event 
         */
        closeSearchBox(event) {
            if (!event.target.closest('.header__search-box')) {
                document.getElementById('header__search-box').classList.remove('active');
            }
        },

        /**
         * Search
         */
        searchProducts() {
            console.log("🚀 ~ this.search:", this.search)

        },
    }
}
</script>

<style lang="scss">
.search-result {
    &__most-search {
        .swiper{
            padding: 8px 0 !important;
        }

        .swiper-slide {
            width: auto !important;
            display: flex;
        }

        .swiper-button-prev,
        .swiper-button-next {
            background: var(--Shade-white, #FFF);
            border: 1px solid #9E9E9E;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            top: 28px;

            &::after{
                color:#D72685;
                font-size: 15px !important;
            }
        }

        &__item {
            border-radius: 4px;
        }
    }
}
</style>
