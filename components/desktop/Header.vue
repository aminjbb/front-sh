<template>
    <client-only>
        <a v-if="topBanner && topBanner.image" class="fixed-banner d-block" id="top-banner" :href="topBanner.link">
            <img data-not-lazy :src="topBanner.image" class="w-100 h-100" :alt="topBanner?.image_alt" width="1400" height="40" :title="topBanner?.image_alt" />
        </a>
    
        <header
            class="header header--desktop w-100"
            id="header--desktop"
            :class="{ 'fixed': isFixed, 'hidden': isHidden, 'has-banner': hasBanner, 'is-top':isTop }">
            <v-container>
                <div class="header__inner d-flex align-center justify-space-between">
                    <div class="header__col1 d-flex algin-center">
                        <a href="/" class="header__logo" title="Shavaz logo">
                            <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="107" height="38" title="Shavaz Logo" />
                        </a>
                        
                        <desktopSearchResult />
                    </div>

                    <div class="header__col2 d-flex align-center justify-end">
                        <div v-if="isLogin" class="mobile-drop-down header__item header__item--profile pos-r">

                            <v-menu :close-on-content-click="false" v-model="menu">
                                <template v-slot:activator="{ props }">
                                    <div
                                        v-bind="props"
                                        class="cur-p"
                                        id="mobile-drop-down__show-dashboard">
                                        <v-icon icon="mdi-account-outline" />
                                        <v-icon icon="mdi-chevron-down" />
                                    </div>
                                </template>

                                <v-list width="172px" class="mt-1 profile-drop-down">
                                    <v-list-item class="mt-2 user-data py-0">
                                        <a href="/user/dashboard" class="d-flex align-center">
                                            <v-icon
                                                icon="mdi-account-circle-outline"
                                                color="grey-darken-3"
                                                size="large"
                                                class="ml-2" />
        
                                            <template v-if="userData && userData.first_name && userData.last_name">
                                                <div class="d-flex flex-column">
                                                    <span class="user-phone t14 text-grey-darken-3">{{ userData.first_name }} {{ userData.last_name }}</span>
<!--                                                     <span v-if="userData && userData.phone_number" class="user-phone t12 text-grey mt-1 number-font">{{userData.phone_number}}</span> -->                                                </div>
                                            </template>
                                            <template v-else>
                                                <span v-if="userData && userData.phone_number" class="user-phone t15 text-grey-darken-3 number-font">{{ userData.phone_number }}</span>
                                            </template>
                                        </a>
                                    </v-list-item>

                                    <v-list-item class="py-0 mt-2">
                                        <a class="text-grey t14 d-flex align-center cur-p" href="/user/order">
                                            <v-icon
                                                icon="mdi-cart-outline"
                                                class="ml-2"
                                                color="grey" />
                                            <span class="text-grey t14">لیست سفارشات</span>
                                        </a>
                                    </v-list-item>

                                    <v-list-item class="py-0">
                                        <a class="text-grey t14 d-flex align-center cur-p" href="/user/address">
                                            <v-icon
                                                icon="mdi-map-marker-outline"
                                                class="ml-2"
                                                color="grey" />
                                            <span class="text-grey t14">آدرس‌ها</span>
                                        </a>
                                    </v-list-item>

                                    <v-list-item class="py-0">
                                        <a class="text-grey t14 d-flex align-center cur-p" href="/user/favorite-list">
                                            <v-icon
                                                icon="mdi-heart-outline"
                                                class="ml-2"
                                                size="small"
                                                color="grey" />
                                            <span class="text-grey t14">علاقمندی‌ها</span>
                                        </a>
                                    </v-list-item>

                                    <v-list-item class="py-0">
                                        <a class="text-grey t14 d-flex align-center cur-p" href="/user/ticket">
                                            <v-icon
                                                icon="mdi-chat-processing-outline"
                                                class="ml-2"
                                                size="small"
                                                color="grey" />
                                            <span class="text-grey t14">ثبت تیکت</span>
                                        </a>
                                    </v-list-item>

                                    <v-list-item class="py-0">
                                        <a class="text-grey t14 d-flex align-center cur-p" @click="openModal()">
                                            <v-icon
                                                icon="mdi-exit-to-app"
                                                class="ml-2"
                                                color="grey" />
                                            <span class="text-grey t14">خروج</span>
                                        </a>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        <a v-else class="header__item header__item--btn t12 w400 text-grey cur-p" @click="goLoginPage()">
                            <v-icon icon="mdi-login" color="grey" />
                            ورود | ثبت نام
                        </a>
        
                        <span class="header__item__sp"></span>
        
                        <a class="header__item" href="/user/favorite-list">
                            <v-icon icon="mdi-heart-outline" />
                        </a>
        
                        <span class="header__item__sp"></span>
        
                        <a class="header__item header__item--basket cur-p" @click="showHeaderBasket()" id="toggle-basket">
                            <v-badge
                                v-if="userBasket && userBasket.details && userBasket.details.length"
                                color="primary"
                                class="number-font"
                                :content="userBasket.details.length"
                                inline />
                            <v-icon icon="mdi-cart-minus" />
                        </a>
                    </div>
                </div>
            </v-container>
            <desktopMenu />
        </header>
        
        <desktopHeaderBasket :userBasket="userBasket" :userData="userData"/>
        
        <v-dialog
            v-if="dialog"
            v-model="dialog"
            color="white"
            width="470px">
            <v-card class="pt-3 px-6 pb-5">
                <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                    <span class="t15 w400">
                        خروج از حساب کاربری
                    </span>
        
                    <v-btn
                        class="c-modal__header__btn pa-0 text-none"
                        @click="closeModal()"
                        color="grey-darken-1"
                        size="large"
                        variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </header>
        
                <div>
                    <p class="t14 w400 my-8 text-center text-grey-darken-2">آیا از خروج از حساب اطمینان دارید؟ </p>
        
                    <div class="d-flex align-center justify-center mt-2 mobile-pa-0 w-100">
                        <v-btn
                            @click="closeModal()"
                            height="44"
                            title="انصراف"
                            class="btn btn--cancel ml-1">
                            انصراف
                        </v-btn>
        
                        <v-btn
                            @click="logout()"
                            height="44"
                            title="خروج از حساب"
                            class="btn btn--submit">
                            خروج از حساب
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </client-only>
</template>
<script>

import Public from '~/composables/Public';
export default {
    name: "Desktop Header",

    data() {
        return {
            isDropdownVisible: false,
            selectedCategory: null,
            isFixed: true,
            isHidden: false,
            lastScrollTop: 0,
            isLogin: false,
            dialog: false,
            hasBanner: false,
            isBanner: false,
            isTop: false,
            menu: false,
        };
    },

    props:{
        userData:null
    },

    computed: {
        userBasket() {
            try {
                const basket = this.$store.getters['get_basket']
                return basket ?.data ?.data
            } catch (e) {
                return []
            }
        },

    },

    setup() {
        const userToken = useCookie('userToken')

        const {
            getTopBanner,
            topBanner,
        } = Public();
        return {
            userToken,
            getTopBanner,
            topBanner,
        }
    },

    mounted() {
        this.getTopBanner();

        window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    watch:{
        userData(newVal){
            if (newVal && newVal.phone_number !== null) {
                this.isLogin = true
            } else {
                this.isLogin = false
            };
        },

        topBanner(newVal){
            if(newVal && newVal!==null){
                this.isBanner = true;
                this.hasBanner = true;
                document.getElementsByTagName('body')[0].classList.add('hasBanner');  
            }
        }
    },

    methods: {
        /**
         * Show and hide menu in scroll down and up
         */
        handleScroll() {
            this.menu = false
            let currentScrollTop = window.scrollY;
            let header = document.getElementById('header--desktop');

            if(header){
                if (this.isBanner) {
                    if (window.scrollY > 185) {
                        header.style.top = '0px';
                        this.isHidden = true;
                        this.isFixed = false;
                        this.hasBanner = false;

                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                        } else {
                            this.isFixed = true;
                            this.isHidden = false;
                        }

                        this.lastScrollTop = currentScrollTop;
                    }

                    if (window.scrollY <= 185) {
                        this.hasBanner = true;
                        header.style.top = `${40 - window.scrollY}px`;
                        
                    }
                } else {
                    if (window.scrollY > 145) {
                        this.isHidden = true;
                        this.isFixed = false;
                        header.style.top = '0px';

                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                        } else {
                            this.isFixed = true;
                            this.isHidden = false;
                        }
                    }

                    if (window.scrollY <= 145) {
                        if (currentScrollTop > this.lastScrollTop) {
                            header.style.top = `${0 - window.scrollY}px`;

                        } else {
                            header.style.top = '0px';
                        }
                    }

                    this.lastScrollTop = currentScrollTop;
                }
            }
        },

        /**
         * show header basket modal
         */
        showHeaderBasket() {
            document.getElementById('basket-header').classList.add('show');
            document.body.classList.add('active-basket');

            let productArr = [];
            this.userBasket.details.forEach(item =>{
                const obj={
                    item_id: item.shps?.sku?.id, 
                    price: Number(String(item.current_site_price).slice(0, -1)),  
                    item_brand: item?.shps?.sku?.brand?.name,   
                    quantity: item.count,
                    name: item?.shps?.sku?.label
                }
                productArr.push(obj);
            });
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'view_cart_popup',  // name of the event. In this case, it always must be view_cart_popup
                ecommerce: {							
                    items: productArr
                }
            });
        },

        /**
         * Open modal
         */
        openModal() {
            this.dialog = true;
        },

        /**
         * Close modal
         */
        closeModal() {
            this.dialog = false;
        },

        /**
         * Logout
         */
        logout() {
            this.userToken = '';
            window.location = '/';
            this.closeModal();
            const itemDropdown = document.getElementById(`mobile-drop-down__items-dashboard`);
            itemDropdown.classList.toggle('show');
        },

        /**
         * Login
         */
        goLoginPage(){
            localStorage.setItem('returnPathAfterLogin' , this.$route.fullPath);
            this.$router.push('/login')
        },
    },
};
</script>
    
<style lang="scss">
@import "~/assets/scss/tools/bp";
$parent: 'header';

.fixed-banner {
    width: 100%;
    height: 40px;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 11;

    img{
        object-fit: cover !important;
    }
}

.#{$parent} {
    &--desktop {
        &.show-mega-menu {
            z-index: 1000;
        }

        z-index: 10;
        padding: 4px;
        padding-bottom: 0 !important;
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);
        background: #fff;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        top: 0;
        right: 0;

        .#{$parent} {
            &__logo {

                width: 107px;
                height: 38px;
                margin-left: 65px;

                @include gbp(769, 1280) {
                    margin-left: 12px;
                }
            }

            &__search-box {
                width: 638px;
                height: 40px;
                border-radius: 4px !important;
                overflow: hidden;
                position: relative;

                @include gbp(769, 1280) {
                    width: 450px;
                }

                &__inner {
                    background: #EEEEEE;
                    border-radius: 2px;

                    input {
                        font-size: 13px !important;
                        height: 40px;
                        border: 0 !important;
                        outline: 0 !important;

                        &:focus {
                            border: 0 !important;
                        }
                    }

                }

                .search-result {
                    display: none;
                    width: 100%;
                    position: absolute;
                    background: #fff;
                    z-index: 5;
                }

                &.active {
                    border-radius: 4px;
                    border: 1px solid var(--grey-grey-lighten-3, #EEE);
                    background: var(--Shade-white, #FFF);
                    border-bottom: 0 !important;
                    overflow: visible;

                    .#{$parent}__search-box__inner {
                        background-color: #fff !important;
                    }

                    .search-result {
                        display: block;
                        border: 1px solid var(--grey-grey-lighten-3, #EEE);
                        border-top: 0 !important;
                        top: 38px;
                        right: 0;
                        padding: 0 12px 12px;
                        width: calc(100% + 2px);
                        margin: -1px;

                        hr {
                            opacity: 1;
                        }
                    }
                }

                .v-input__control,
                .v-field__prepend-inner,
                .v-field__field {
                    height: 40px;
                }

                .v-field {
                    box-shadow: none;
                    background: #EEEEEE;
                    border-radius: 2px;
                }

                .v-field__input,
                .v-field-label {
                    font-size: 13px !important;
                }
            }

            &__item {
                &--profile {
                    display: flex;
                    align-items: flex-end;
                }

                .v-icon {
                    color: #AEAEAE;
                }

                .v-icon.mdi-cart-minus,
                .v-icon.mdi-heart-outline,
                .v-icon.mdi-account-outline {
                    font-size: 23px;
                }

                &--btn {
                    border-radius: 4px;
                    border: 1px solid var(--grey-grey-lighten-1, #BDBDBD);
                    padding: 4px 8px
                }

                &__sp {
                    display: block;
                    width: 1px;
                    height: 22px;
                    margin: 0 10px;
                    background: #DEDEDE;
                }

                .mdi-chevron-down {
                    font-size: 16px;
                }

                &--basket{
                    position: relative;
                    .v-badge{
                        position: absolute;
                        z-index: 2;
                        left: 5px;
                        top: -5px;

                        &__badge{
                            font-family: 'IranSansFaNum' !important;
                        }
                    }
                }
            }
        }

        &.has-banner {
            top: 40px;
        }

        &.hidden {
            position: fixed;
            opacity: 0;
            transform: translateY(-100%);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        &.fixed {
            position: fixed;
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
    }
}
.profile-drop-down{
    .v-list-item{
        min-height: 40px !important;
    }
}
</style>

<style lang="scss" scoped>
.mobile-drop-down__items {
    left: 0;
    width: 172px;

    li:not(.user-data) {
        a:hover {

            span,
            .v-icon {
                color: #D72685 !important;
            }
        }
    }
}
</style>
