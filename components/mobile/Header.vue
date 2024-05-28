<template>
<client-only>
    <a v-if="topBanner && topBanner.image" class="fixed-banner d-block" id="top-banner" :href="topBanner.link">
        <img data-not-lazy :src="topBanner.image" class="w-100 h-100" :alt="topBanner?.image_alt" width="1400" height="64" :title="topBanner?.image_alt" />
    </a>

    <header class="header header--mobile w-100" :class="{ 'fixed': isFixed, 'hidden': isHidden, 'has-banner': hasBanner, 'is-top':isTop }" id="mobile-header">
        <div class="d-flex align-center">
            <a href="/" class="d-flex align-center header__logo" title="Shavaz logo" id="mobile-logo">
                <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="79" height="28" title="Shavaz Logo" />
            </a>
            <mobileSearchResult />
        </div>
    </header>
<mobileMenu />
</client-only>
</template>

<script>
import Public from '~/composables/Public';

export default {
    data() {
        return {
            isFixed: true,
            isHidden: false,
            lastScrollTop: 0,
            hasBanner: false,
            isBanner: false,
            isTop: false,
        };
    },

    setup() {
        const {
            getTopBanner,
            topBanner,
        } = Public();

        return {
            getTopBanner,
            topBanner
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.getTopBanner();
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

            if (this.isBanner) {
                if (window.scrollY > 64) {
                    this.isHidden = true;
                    this.isFixed = false;
                    this.hasBanner = false;

                    const menu = document.getElementById('menu--mobile');
                    if(menu){
                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                            menu.classList.add('change-height');
                        } else {
                            this.isFixed = true;
                            this.isHidden = false;

                            menu.classList.remove('change-height');
                        }
                    }
                    this.lastScrollTop = currentScrollTop;
                }
                if (window.scrollY <= 64) {
                    const header = document.getElementById('mobile-header');
                    header.style.top = `${64 - window.scrollY}px`;
                    this.hasBanner = true;
                }
            }
            else{
                if (window.scrollY > 64) {
                    this.isHidden = true;
                    this.isFixed = false;

                    const menu = document.getElementById('menu--mobile');
                    if(menu){
                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                            menu.classList.add('change-height');
                        } else {
                            this.isFixed = true;
                            this.isHidden = false;

                            menu.classList.remove('change-height');
                        }
                    }
                    this.lastScrollTop = currentScrollTop;
                }
                if (window.scrollY <= 64) {
                    const header = document.getElementById('mobile-header');
                }
            }
        },
    },

    watch:{
        topBanner(newVal){
            if(newVal){
                this.isBanner = true;
                this.hasBanner = true;
                document.getElementsByTagName('body')[0].classList.add('hasBanner');  
            }
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
$parent: 'header';

.fixed-banner {
    width: 100%;
    height: 64px;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 11;
}

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

        &.has-banner {
            top: 64px;
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
