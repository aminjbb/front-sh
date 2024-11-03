<template>
    <v-main v-if="menuList && menuList.length" class="menu menu--mobile" id="menu--mobile">
        <nav>
            <div>
                <div v-if="categoryList && categoryList.length > 0" class="menu__name my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none" class="ml-1">
                        <path d="M9 1.75C4.86 1.75 1.5 5.11 1.5 9.25C1.5 13.39 4.86 16.75 9 16.75C13.14 16.75 16.5 13.39 16.5 9.25C16.5 5.11 13.14 1.75 9 1.75ZM11.6475 10.1725L7.7625 12.865C7.1925 13.2625 6.8625 13.03 7.0275 12.3625L7.74 9.4825L6.5025 9.175C5.94 9.04 5.8725 8.65 6.345 8.32L10.23 5.6275C10.8 5.23 11.13 5.4625 10.965 6.13L10.2525 9.01L11.49 9.3175C12.0525 9.46 12.12 9.8425 11.6475 10.1725Z" fill="#3C3C3C"/>
                    </svg>
                    <span class="t16 w700">پرفروش ترین ها</span>
                </div>

                <swiper v-if="categoryList && categoryList.length > 0 " dir="rtl" :slidesPerView="2.5" :spaceBetween="10" :navigation="false" :breakpoints="{
                    '200': {
                        slidesPerView: 2.5,
                        spaceBetween: 15,
                    },
                    '500': {
                        slidesPerView: 2.7,
                        spaceBetween: 15,
                    },
                    '768': {
                        slidesPerView: 3.5,
                    }
                }" class="mySwiper menu__slider mb-3 px-5">
                    <swiper-slide v-for="(category, index) in categoryList" :key="`category${index}`">
                        <a class="menu__slider__item d-flex flex-column justify-center align-center" :href="category?.link" :title="category?.label">
                            <img :src="category?.image" :alt="category?.image_alt" width="130" height="90" class="w-100" />
                        </a>
                    </swiper-slide>
                </swiper>

                <div class="menu__name pt-5">
                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z" stroke="#3C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="t16 w700">دسته‌بندی</span>
                </div>

                <ul class="menu__items">
                    <template v-if="menuList[0] && menuList[0]?.children && menuList[0]?.children.length">
                        <li class="menu__item" v-for="item in menuList[0]?.children" :key="item?.id" :id="`menu__item--${item.id}`" :class="{'has-child' : item?.children }">
                            <div class="menu__item__info" @click="openSubMenu(item.id)" :class="item?.children && item?.children.length ? 'mb-3' : 'mb-2 mt-2'">
                                <a class="menu__item__link position-relative">
                                    <v-icon :icon="`mdi-${item?.icon}`" class="ml-1" />
                                    <span>{{item?.label}}</span>
                                    <v-icon class="down-icon" v-if="item?.children && item?.children.length" icon="mdi-chevron-down" size="small" />
                                </a>

                                <div v-if="item?.children && item?.children.length" class="child-preview">
                                    <span v-for="child1 in item?.children.slice(0,5)" :key="child1.id" class="t10 w400 text-grey ">
                                        <v-icon icon="mdi-circle" class="t10 text-primary sp d-inline-block mx-1" color="primary"></v-icon>
                                        {{ child1.label }}
                                    </span>
                                </div>
                            </div>

                            <ul v-if="item?.children && item?.children.length" class="menu__items" :id="`menu__items--${item?.id}`">
                                <li class="pb-3">
                                    <a :href="item?.url" class="menu__item__link d-flex align-center justify-space-between">
                                        <span class="t12 w700 text-primary">همه محصولات {{item?.label}}</span>
                                        <v-icon icon="mdi-chevron-left" color="primary"/>
                                    </a>
                                </li>
                                
                                <li v-for="child1 in item?.children" :key="child1.id" class="menu__item" :class="child1.children ? 'has-child' :''" :id="`menu__item--${child1.id}`">
                                    <a :href="child1.url" class="menu__item__link d-flex align-center justify-space-between">
                                        <span class="t12">{{child1.label}}</span>
                                        <v-icon icon="mdi-chevron-left" size="small" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </v-main>
</template>

<script>
// Composables
import Menu from '~/composables/Menu';
import Public from '~/composables/Public';

// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
    data() {
        return {
            categoriesMenu: []
        }
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const title = ref('فروشگاه شاواز | دسته بندی محصولات')
        const description = ref('فروشگاه اینترنتی لوازم آرایشی بهداشتی شاواز، مقایسه و خرید آنلاین لوازم آرایشی و بهداشتی، لوازم شخصی، لوازم زیبایی و سلامت بصورت شخصی یا خانواده برای آقایان، خانم‌ها و کودکان، برندهای ایرانی و خارجی با ضمانت اصالت کالا با پایین ترین قیمت')

        useHead({
        title,
        meta: [{
            name: 'description',
            content: description
        }],
        });

        const {
            getMenuList,
            menuList,
            loading
        } = Menu();

        const {
            getBestCategoryList,
            categoryList
        } = Public();

        return {
            getMenuList,
            menuList,
            loading,
            getBestCategoryList,
            categoryList
        };
    },

    mounted() {
        /**
         * Call apis
         */
        this.getMenuList();
        this.getBestCategoryList();
    },

    methods: {
        getCategoriesMenu() {
            if (this.menuList && this.menuList.length > 0) {
                this.menuList.forEach(element => {
                    if (element.name == 'categories') {
                        this.categoriesMenu.push(this.element)
                    }
                });
                return this.categoriesMenu;
            }
        },
        /**
         * Open first sub menu
         */
        openSubMenu(id) {
            document.getElementById(`menu__items--${id}`).classList.toggle('show-mega-menu');
            document.getElementById(`menu__item--${id}`).classList.toggle('active-menu');
        },

    }
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/components/mobile/general/menu.scss';
@import "~/assets/scss/tools/bp";

.menu--mobile{
    padding-top: 160px;
    padding-bottom: 150px;

    @include gbp (0, 768) {
        padding-top: 0;
    }
}
</style>
