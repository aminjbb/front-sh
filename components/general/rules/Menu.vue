<template>
<nav class="rules-menu br16 s-border py-2 px-4 s-border--dark-gray">
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
                color="sGrayLighten2"
                class="ml-3" />
            <a class="t14 w700 text-sGray" :href="menu.link" :title="menu.title">
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
                },
                {
                    id: 10,
                    title: "فرایند مرجوعی",
                    link: "/rules/return-order",
                    icon: "package-variant-minus"
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
    >div:first-child.xs-show{
        height: 51px;
        line-height: 50px;
    }

    &__items {
        @include gbp (0, 768) {
            transition: height 0.5s ease;
            height: 0;
            overflow: hidden;
        }

        &.open {
            transition: height 0.5s ease;
            height: 460px;
        }
    }

    &__item {
        padding: 14px 2px 13px;
        list-style: none;
        cursor: pointer;

        &:hover {
            .v-icon {
                color: #E77DB6 !important;
            }
        }

        &.active {
            .v-icon {
                color: #E77DB6 !important;
            }
        }
    }

    &__item:not(:last-child) {
        border-bottom: 0.5px solid #BDBDBD;
    }

}
</style>
