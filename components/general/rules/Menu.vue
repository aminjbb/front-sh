<template lang="">
<nav class="rules-menu card">
    <div class="xs-show" @click="openMenu()">
        <v-icon
            id="rules-menu__icon"
            icon="mdi-menu"
            color="grey-darken-3" />
    </div>

    <ul class="rules-menu__items pa-0 ma-0" id="rules-menu__items">
        <li
            class="rules-menu__item d-flex align-center"
            v-for="(menu, index) in menuItems"
            :key="`rules-menu${index}`"
            :class="{ active: isActive(menu.link) }">
            <v-icon
                :icon="`mdi-${menu.icon}`"
                color="grey"
                class="ml-3" />
            <a class="t14 text-grey" :href="menu.link" :title="menu.title">
                {{menu.title}}
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [{
                    id: 1,
                    title: "قوانین عمومی",
                    link: "/rules/general-rules",
                    icon: "information-box-outline"

                },
                {
                    id: 2,
                    title: "اطلاعات حساب",
                    link: "/rules/information",
                    icon: "account-details-outline"
                },
                {
                    id: 3,
                    title: "سفارش های من",
                    link: "/rules/my-orders",
                    icon: "order-bool-descending-variant"
                },
                {
                    id: 4,
                    title: "نحوه ی معاملات",
                    link: "/rules/how-to-trade",
                    icon: "trademark"
                },
                {
                    id: 5,
                    title: "بازگشت محصول",
                    link: "/rules/product-return",
                    icon: "keyboard-return"
                },
                {
                    id: 7,
                    title: "استاندارد",
                    link: "/rules/standard",
                    icon: "standard-definition"
                },
                {
                    id: 8,
                    title: "محصولات ایرانی",
                    link: "/rules/iranian-products",
                    icon: "basket-outline"
                },
                {
                    id: 9,
                    title: "حقوق اداره کار",
                    link: "/rules/office-rights",
                    icon: "office-building-outline"
                }
            ],
        }
    },

    methods: {
        isActive(route) {
            return this.$route.path === route;
        },

        openMenu() {
            document.getElementById('rules-menu__items').classList.toggle('open');
            document.getElementById('rules-menu__icon').classList.toggle('mdi-close');
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.rules-menu {
    &__items {
        @include gbp (0, 768) {
            transition: height 0.5s ease;
            height: 0;
            overflow: hidden;
        }

        &.open {
            transition: height 0.5s ease;
            height: 420px;
        }
    }

    &__item {
        padding: 14px 2px 13px;
        list-style: none;
        cursor: pointer;

        &:hover {

            a,
            .v-icon {
                color: #D72685 !important;
            }
        }

        &.active {

            a,
            .v-icon {
                color: #D72685 !important;
            }
        }
    }

    &__item:not(:last-child) {
        border-bottom: 0.5px solid #BDBDBD;
    }

}
</style>
