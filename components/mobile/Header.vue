<template lang="">
<header class="header header--mobile w-100" :class="{ 'fixed': isFixed, 'hidden': isHidden }">
    <div class="d-flex align-center">
        <a href="/" class="d-flex align-center header__logo" title="Shavaz logo" id="mobile-logo">
            <img src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="79" height="28" title="Shavaz Logo" />
        </a>
        <mobileSearchResult />
    </div>
</header>
<mobileMenu />
</template>

<script>
export default {
    data() {
        return {
            isFixed: true,
            isHidden: false,
            lastScrollTop: 0,
        };
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        /**
         * Show and hide menu in scroll down and up
         */
        handleScroll() {
            let currentScrollTop = window.scrollY;

            if (window.scrollY > 60) {
                this.isHidden = true;
                this.isFixed = false;
                const menu = document.getElementById('menu--mobile');

                if (currentScrollTop > this.lastScrollTop) {
                    this.isHidden = true;
                    this.isFixed = false;

                    menu.classList.add('change-height');
                } else {
                    this.isFixed = true;
                    this.isHidden = false;

                    menu.classList.remove('change-height');
                }

                this.lastScrollTop = currentScrollTop;
            }
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
$parent: 'header';

.#{$parent} {
    &--mobile {
        position: fixed;
        z-index: 10;
        top: 0;
        right: 0;
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        width: 100%;
        height: 56px;
        background: #fff;
        z-index: 3;
        box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.10);
        padding: 8px;

        .#{$parent} {
            &__logo {
                margin-left: 16px;
            }
        }

        &.hidden {
            opacity: 0;
            transform: translateY(-100%);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        &.fixed {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
    }
}

.header__search-box {
    flex: 1;
    height: 40px;
    border-radius: 4px !important;
    overflow: hidden;
    position: relative;

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
        overflow: auto;
        height: auto;
        overflow-x: hidden;

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
</style>
