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
        <swiper
            dir="rtl"
            :slidesPerView="3.2"
            :spaceBetween="8"
            :modules="modules"
            :navigation="true"
            :breakpoints="{
                '992': {
                    slidesPerView: 2.2,
                },
                '1398': {
                    slidesPerView: 3.2,
                }
            }"
            class="mySwiper search-result__sku">
            <swiper-slide v-for="(item, index) in skuListMoc.slice(0,10)" :key="`sku-search-${index}`">
                <a class="d-flex align-center search-result__sku__item pa-2 py-1 bg-grey-lighten-3" :href="`/sku/${item.slug}`">
                    <div class="search-result__sku__image">
                        <img :src="imageAddress(item?.image?.image_url)" :title="item.label" :alt="item.label" width="48" height="48" />
                    </div>

                    <h3 v-if="item.label" class="t11 w400 text-grey-darken-1">
                        {{item.label}}
                    </h3>
                </a>
            </swiper-slide>
        </swiper>

        <v-divider color="grey-lighten-3" />

        <v-row class="ma-0">
            <v-col cols="6" class="pa-0">
                <div class="search-result__list search-result__list--border pa-3 pb-1">
                    <header>
                        <h2 class="t14 w400 text-grey-darken-4 mb-2">دسته‌بندی‌های مرتبط</h2>
                    </header>

                    <nav>
                        <ul class="ma-0">
                            <li
                                class="mb-2"
                                v-for="(item, index) in categoryListMoc.slice(0,5)"
                                :key="`category-search-${index}`">
                                <a class="t13 w400 text-grey-darken-2" :href="`/sku/${item.slug}`">
                                    {{item.label}}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </v-col>
            <v-col cols="6" class="pa-0">
                <div class="search-result__list pa-3 pb-1">
                    <header>
                        <h2 class="t14 w400 text-grey-darken-4 mb-2">برندهای مرتبط</h2>
                    </header>

                    <nav>
                        <ul class="ma-0">
                            <li
                                class="mb-2"
                                v-for="(item, index) in brandListMoc"
                                :key="`category-search-${index}`">
                                <a class="t13 w400 text-grey-darken-2" :href="`/sku/${item.slug}`">
                                    {{item.label}}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </v-col>
        </v-row>

        <v-divider color="grey-lighten-3" />

        <nav class="search-result__list py-3">
            <ul class="ma-0">
                <li
                    class="mb-2"
                    v-for="(item, index) in skuGroupListMoc.slice(0,5)"
                    :key="`category-search-${index}`">
                    <a class="d-flex align-center" :href="`/sku/${item.slug}`">
                        <v-icon icon="mdi-magnify" size="x-small" color="grey-lighten-1" class="ml-2"/>
                        <span class="t13 w400 text-grey-darken-2">{{item.label}}</span>
                    </a>
                </li>
            </ul>
        </nav>

        <v-divider color="grey-lighten-3" />

        <div class="search-result__most-search">
            <h5 class="t13 w400 text-grey-darken-3 mb-1 mt-5">بیشترین جستجوهای اخیر</h5>

            <swiper
                dir="rtl"
                :slidesPerView="'auto'"
                :spaceBetween="8"
                :modules="modules"
                :navigation="true"
                class="mySwiper">
                <swiper-slide v-for="(item, index) in mostSearchItemsMoc.slice(0,15)" :key="`most-search-${index}`">
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
            ],
            skuList: [],
            skuListMoc: [{
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'پماد پیشگیری کننده سوختگی پای کودک وی کر ظرفیت 75 میلی لیتر'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'پماد پیشگیری کننده سوختگی پای کودک وی کر ظرفیت 75 میلی لیتر'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'پماد پیشگیری کننده سوختگی پای کودک وی کر ظرفیت 75 میلی لیتر'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'پماد پیشگیری کننده سوختگی پای کودک وی کر ظرفیت 75 میلی لیتر'
                }
            ],
            categoryList: [],
            categoryListMoc: [{
                    label: 'کرم پودر',
                    slug: ''
                },
                {
                    label: 'کرم و بالم لب',
                    slug: ''
                },
                {
                    label: 'کرم، شامپو و اسپری رنگ مو',
                    slug: ''
                },
                {
                    label: 'روغن و کرم برنز',
                    slug: ''
                },
                {
                    label: 'کرم دور چشم',
                    slug: ''
                }
            ],
            brandList: [],
            brandListMoc: [{
                    label: 'کریستال',
                    slug: ''
                },
                {
                    label: 'وی کر',
                    slug: ''
                },
                {
                    label: 'کریستیم دیور',
                    slug: ''
                }
            ],
            skuGroupList: [],
            skuGroupListMoc: [{
                    label: 'کرم کودک',
                    slug: ''
                },
                {
                    label: 'کرم دست',
                    slug: ''
                },
                {
                    label: 'کرم ضد آفتاب',
                    slug: ''
                },
                {
                    label: 'کراتین مو',
                    slug: ''
                }
            ],
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

        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        }
    }
}
</script>

<style lang="scss">
.search-result {

    .swiper-button-prev,
    .swiper-button-next {
        background: var(--Shade-white, #FFF);
        border: 1px solid #9E9E9E;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        top: 28px;

        &::after {
            color: #D72685;
            font-size: 15px !important;
        }
    }

    .swiper-slide {
        display: flex;
    }

    &__sku {
        padding: 20px 0;

        &__item {
            border-radius: 4px;
            overflow: hidden;
        }

        &__image {
            width: 48px;
            flex: 0 0 48px;
            margin-left: 7px;
            height: 100%;

            img {
                max-width: 100%;
            }
        }

        .swiper-button-prev,
        .swiper-button-next {
            top: 55%
        }
    }

    &__list {
        height: 100%;

        &--border {
            border-left: 1px solid #E0E0E0
        }

        li {
            list-style: none;
        }
    }

    &__most-search {
        .swiper {
            padding: 8px 0 !important;
        }

        .swiper-slide {
            width: auto !important;
        }

        &__item {
            border-radius: 4px;
        }
    }
}
</style>
