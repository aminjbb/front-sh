<template>
<header class="header header--desktop" id="header--desktop">
    <v-container>
        <div class="header__inner d-flex align-center justify-space-between">
            <div class="header__col1 d-flex algin-center">
                <a href="/" class="header__logo" title="Shavaz logo">
                    <img src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="107" height="38" title="Shavaz Logo" />
                </a>

                <div class="header__search-box">
                    <v-text-field
                        :loading="loading"
                        color="grey-lighten-3"
                        density="compact"
                        variant="solo"
                        label="جستجو در شاواز "
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                        @click:append-inner="onClick" />
                </div>
            </div>
            <div class="header__col2 d-flex align-center justify-end">
                <div class="header__item header__item--profile">
                    <v-icon icon="mdi-account-outline" />
                    <v-icon icon="mdi-chevron-down" />
                </div>

                <span class="header__item__sp"></span>

                <a class="header__item">
                    <v-icon icon="mdi-heart-outline" />
                </a>

                <span class="header__item__sp"></span>

                <a class="header__item">
                    <v-icon icon="mdi-cart-minus" />
                </a>
            </div>
        </div>
    </v-container>
    <desktopMenu />
</header>
</template>

<script>
export default {
    name: "Desktop Header",

    data() {
        return {
            isDropdownVisible: false,
            selectedCategory: null,
        };
    },

    methods: {

    },
};
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
$parent: 'header';

.#{$parent} {
    &--desktop {
        &.show-mega-menu {
            position: relative;
            z-index: 1000;
        }

        padding: 4px;
        padding-bottom: 0 !important;
        border-bottom: 1px solid #DDDDDD;
        box-shadow: 0px 4px 9px rgba(66, 66, 66, 0.1);
        background: #fff;

        .#{$parent} {
            &__logo {

                width: 107px;
                height: 38px;
                margin-left: 65px;
                @include gbp(768,1280){
                    margin-left: 12px;
                }
            }

            &__search-box {
                width: 638px;
                height: 40px;
                border-radius: 4px !important;
                overflow: hidden;

                @include gbp(768,1280){
                    width: 450px;
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
                    font-size: 23px;
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
            }
        }
    }
}
</style>
