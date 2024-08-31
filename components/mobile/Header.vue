<template>
<client-only>
    <a v-if="topBanner && topBanner.image" class="fixed-banner--mobile d-block fixed-banner--mobile" id="top-banner" :href="topBanner.link">
        <img data-not-lazy :src="topBanner.image" class="w-100 h-100" :alt="topBanner?.image_alt" width="1400" height="40" :title="topBanner?.image_alt" />
    </a>

    <header class="header header--mobile w-100">
        <div class="d-flex align-center justify-space-between header__logo-row">
            <a href="/" class="d-flex align-center header__logo" title="Shavaz logo" id="mobile-logo">
                <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="79" height="28" title="Shavaz Logo" />
            </a>

            <a href="/user/ticket" class="header__notification">
                <v-icon icon="mdi-bell" />
            </a>
        </div>

        <div id="mobile-header__search" :class="{ 'fixed': isFixed, 'hidden': isHidden, 'has-banner': hasBanner, 'is-top':isTop }">
            <mobileSearchResult />
        </div>
    </header>
    <mobileMenu :class="{'has-banner': hasBanner }"/>
</client-only>
</template>

<script>
import Public from '~/composables/Public';

export default {
    data() {
        return {
            isFixed: false,
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
            const menu = document.getElementById('menu--mobile');

            if (this.isBanner) {
                if (window.scrollY > 158) {
                    this.isHidden = true;
                    this.isFixed = false;
                    this.hasBanner = false;
                    menu.style.top = '';
                    menu.style.height = '';

                   
                    if (menu) {
                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                            menu.classList.add('change-height');
                            menu.classList.remove('change-height2');
                        } else {
                            this.isFixed = true;
                            this.isHidden = false;

                            menu.classList.remove('change-height');
                            menu.classList.add('change-height2');
                        }
                    }
                    this.lastScrollTop = currentScrollTop;
                }
                if (window.scrollY <= 158) {
                    this.isFixed = false;
                    this.isHidden = false;
                    menu.style.top = `${158 - window.scrollY}px`;
                    menu.style.height = `calc(100% - ${214 - window.scrollY}px)`;
                }
            } else {
                if (window.scrollY > 118) {
                    this.isHidden = true;
                    this.isFixed = false;
                    this.hasBanner = false;
                    menu.style.top = '';
                    menu.style.height = '';

                   
                    if (menu) {
                        if (currentScrollTop > this.lastScrollTop) {
                            this.isHidden = true;
                            this.isFixed = false;

                            menu.classList.add('change-height');
                            menu.classList.remove('change-height2');
                        } else {
                            this.isFixed = true;
                            this.isHidden = false;

                            menu.classList.remove('change-height');
                            menu.classList.add('change-height2');
                        }
                    }
                    this.lastScrollTop = currentScrollTop;
                }
                if (window.scrollY <= 118) {
                    this.isFixed = false;
                    this.isHidden = false;
                    menu.style.top = `${118 - window.scrollY}px`;
                    menu.style.height = `calc(100% - ${174 - window.scrollY}px)`;
                }
            }
        },
    },

    watch: {
        topBanner(newVal) {
            if (newVal) {
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

.fixed-banner--mobile {
    width: 100% !important;
    height: 40px !important;
    position: relative !important;

    img {
        object-fit: cover !important;
    }
}

.#{$parent} {
    &--mobile {
        z-index: 11;
        position: relative;
        
        .#{$parent}__logo-row {
            height: 48px;
            padding: 12px 16px 0;
            background: #fff;
        }

        .#{$parent}__notification {
            width: 36px !important;
            height: 36px !important;
            border-radius: 12px;
            border: 1px solid #E8E8E8;
            background: #F5F5F5;
            display: flex;
            align-items: center;
            justify-content: center;

            .v-icon {
                color: #6A6A6A;
                font-size: 24px;
            }
        }

        .header__search-box {
            flex: 1;
        }

    }
}

.header__search-box {
    &__inner--show {
        border-radius: 12px !important;
        border: 1px solid #E8E8E8 !important;
        background: #F5F5F5 !important;
        position: relative;

        input {
            font-size: 13px !important;
            height: 40px;
            border: 0 !important;
            outline: 0 !important;

            &:focus {
                border: 0 !important;
            }
        }

        .v-icon {
            font-size: 28px !important;
        }

        .header__search-box__brand-name {
            font-size: 14px !important;
            font-variation-settings: "wght"800 !important;
            color: #D72685;
            position: absolute;
            right: 105px;
            top: 11px;
        }

        #inputSearchMobile {
            font-size: 14px !important;
            color: #6A6A6A !important;
            font-variation-settings: "wght"700 !important;
            flex-grow: 1;

            &::placeholder {
                font-size: 14px !important;
                font-variation-settings: "wght"700 !important;
                font-weight: 700 !important;
                color: #6A6A6A !important
            }
        }

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
        background: #fff;
        z-index: 5;
    }

    &.active {
        border-radius: 4px;
        border: 1px solid var(--grey-grey-lighten-3, #EEE);
        background: var(--Shade-white, #FFF);
        border-bottom: 0 !important;
        overflow: auto;
        height: 100%;
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

#mobile-header__search {
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    width: 100% !important;
    z-index: 10;
    height: 70px;
    padding: 12px 16px 16px;
    background: #fff;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);

    &.hidden {
        opacity: 0;
        transform: translateY(-100%);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        position: fixed;
        top: 0;
    }

    &.fixed {
        position: fixed;
        top: 0;
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
}
</style>
