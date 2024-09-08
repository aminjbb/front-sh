<template>
<client-only>
    <a v-if="topBanner && topBanner.image" class="fixed-banner d-block fixed-banner--mobile" id="top-banner" :href="topBanner.link">
        <img data-not-lazy :src="topBanner.image" class="w-100 h-100" :alt="topBanner?.image_alt" width="1400" height="40" :title="topBanner?.image_alt" />
    </a>

    <header class="header header--mobile header--mobile-plp w-100" :class="{ 'fixed': isFixed, 'hidden': isHidden, 'has-banner': hasBanner, 'is-top':isTop }" id="mobile-header">
        <div class="w-100 d-flex align-center justify-space-between header__logo-row">
            <div class="d-flex align-center">
                <a :href="pageReference && pageReference !== null && pageReference.slug ? `${runtimeConfig.public.siteUrl}/${pageSlug}/${pageReference.slug}` :'/' ">
                    <v-icon icon="mdi-chevron-right" color="text-gray-darken-3" class="ml-1" />
                </a>

                <span class="t14 w700 text-gray-darken-3">
                    <template v-if="pageReference && pageReference !== null && pageReference.label">{{ pageReference.label }}</template>
                    <template v-else>{{ pageTitle }}</template>
                </span>
            </div>

            <mobileSearchResult buttonType="icon" />
        </div>
    </header>
    <mobileMenu class="menu-plp" :class="{'has-banner': hasBanner }"/>
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

    props: {
        pageTitle: String,
        items:Array,
        pageReference: Object,
        pageSlug: {
            type: String,
            default: 'category'
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()

        const {
            getTopBanner,
            topBanner,
        } = Public();

        return {
            getTopBanner,
            topBanner,
            runtimeConfig
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
                if (window.scrollY > 88) {
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
                            menu.style.top = 0;
                        } else {
                            this.isFixed = true;
                            this.isHidden = false;

                            menu.classList.remove('change-height');
                            menu.style.top = '48px';
                        }
                    }
                    this.lastScrollTop = currentScrollTop;
                }
                if (window.scrollY <= 88) {
                    this.isFixed = false;
                    this.isHidden = false;
                    menu.style.top = `${88 - window.scrollY}px`;
                    menu.style.height = `calc(100% - ${144 - window.scrollY}px)`;
                }
            } else {
                if (window.scrollY > 48) {
                    this.isHidden = true;
                    this.isFixed = false;
                    menu.style.top = '';
                    menu.style.height = '';

                    if (menu) {
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
                if (window.scrollY <= 48) {
                    this.isFixed = false;
                    this.isHidden = false;
                    menu.style.top = `${48 - window.scrollY}px`;
                    menu.style.height = `calc(100% - ${104 - window.scrollY}px)`;
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
    &--mobile-plp {
        .#{$parent}__logo-row {
            height: 48px;
            padding: 0 16px 0 !important;
            background: #fff;
            box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);

            .v-icon.mdi-chevron-right {
                font-size: 25px !important;
            }
        }
    }

    .header__search-box {
        flex-grow: 0 !important
    }

}

.header__search-box {
    .v-icon.icon-mode {
        font-size: 26px !important;
    }

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

#mobile-header {
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    width: 100% !important;
    z-index: 11;

    background: #fff;
    overflow: hidden;
    position: relative;

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
