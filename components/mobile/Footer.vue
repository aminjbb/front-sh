<template lang="">
<footer class="footer footer--mobile">
    <nav class="footer__menu h-100 w-100">
        <ul class="ma-0 pa-0 d-flex justify-space-between align-center h-100">
            <li class="footer__menu__item">
                <a href="/" :class="{ active: isActive('/') }">
                    <v-icon icon="mdi-home-outline" />
                    <span class="t12 w-400">خانه</span>
                </a>
            </li>

            <li class="footer__menu__item">
                <a @click="openCategoryMenu()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z"
                            stroke="#757575"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="t12 w-400">دسته‌بندی</span>
                </a>
            </li>

            <li class="footer__menu__item">
                <a href="/cart" :class="{ active: isActive('/cart') }" class="pos-r footer__menu__item--basket">
                    <v-icon icon="mdi-cart-outline" />
                    <v-badge
                        v-if="userBasket && userBasket.details && userBasket.details.length"
                        color="primary"
                        class="number-font"
                        :content="userBasket.details.length"
                        inline />
                    <span class="t12 w-400">سبد خرید</span>
                </a>
            </li>

            <li v-if="isLogin" class="footer__menu__item">
                <a href="/user/dashboard" :class="{ active: isActive('/user/dashboard') }">
                    <v-icon icon="mdi-account-outline" />
                    <span class="t12 w-400">حساب کاربری</span>
                </a>
            </li>
            <li v-else class="footer__menu__item">
                <a href="/login" @click="goLoginPage()">
                    <v-icon icon="mdi-login" />
                    <span class="t12 w-400">ورود | ثبت نام</span>
                </a>
            </li>
        </ul>
    </nav>
</footer>
</template>

<script>
export default {
    data() {
        return {
            isLogin:false
        }
    },

    setup() {
        const userToken = useCookie('userToken')
        return {
            userToken,
        }
    },

    computed: {
        userBasket() {
            try {
                const basket = this.$store.getters['get_basket']
                return basket ?.data ?.data
            } catch (e) {
                return []
            }
        }
    },

    created() {
        if (this.userToken) {
            this.isLogin = true
        } else {
            this.isLogin = false
        };
    },

    methods: {
        /**
         * Open category menu
         */
        openCategoryMenu() {
            const menu = document.getElementById('menu--mobile');
            menu.classList.toggle('open-menu');
        },

        /**
         * Active route
         * @param {*} route 
         */
        isActive(route) {
            return this.$route.path === route;
        },

        /**
         * Login
         */
         goLoginPage(){
            localStorage.setItem('returnPathAfterLogin' , this.$route.fullPath);
            this.$router.push('/login')
        },
    }
}
</script>

<style lang="scss">
$parent: 'footer';

.#{$parent} {
    &--mobile {
        width: 100%;
        height: 56px;
        background: #fff;
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20);
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 10;

        .#{$parent} {
            &__menu {
                &__item {
                    height: 100%;
                    list-style: none;
                    flex: 1;

                    a {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 8px;

                        &:hover {

                            > span,
                            > .v-icon {
                                color: #D72685 !important;
                            }

                            > svg path {
                                stroke: #D72685
                            }
                        }

                        &.active {
                            > span,
                            > .v-icon {
                                color: #D72685 !important;
                            }

                            > svg path {
                                stroke: #D72685
                            }
                        }
                    }

                    &--basket{
                        .v-badge{
                            position: absolute;
                            z-index: 2;
                            left: 50%;
                            top: 3px;

                            &__badge{
                                font-family: 'IranSansFaNum' !important;
                                color:#fff !important;
                            }
                        }
                    }

                    span,
                    .v-icon {
                        color: #757575 !important;
                    }
                }
            }
        }
    }
}
</style>
