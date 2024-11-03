<template>
<client-only>
    <a v-if="topBanner && topBanner.image" class="fixed-banner d-block fixed-banner--mobile" id="top-banner" :href="topBanner.link">
        <img data-not-lazy :src="topBanner.image" class="w-100 h-100" :alt="topBanner?.image_alt" width="1400" height="40" :title="topBanner?.image_alt" />
    </a>

    <header class="header header--mobile header--mobile-plp w-100" :class="{ 'fixed': isFixed, 'hidden': isHidden, 'has-banner': hasBanner, 'is-top':isTop, 'ov-v':submenu }" id="mobile-header">
        <div class="w-100 d-flex align-center justify-space-between header__logo-row">
            <div class="d-flex align-center">
                <a :href="pageReference && pageReference !== null && pageReference.slug ? `${runtimeConfig.public.siteUrl}/${pageSlug}/${pageReference.slug}` :'/' " class="text-sGrayDarken2">
                    <v-icon icon="mdi-chevron-right" color="sGrayDarken2" class="ml-1" />
                </a>

                <span class="t14 w700 text-sGrayDarken2">
                    <template v-if="pageReference && pageReference !== null && pageReference.label">{{ pageReference.label }}</template>
                    <template v-else>{{ pageTitle }}</template>
                </span>
            </div>

            <mobileSearchResult buttonType="icon" />
        </div>

        <div v-if="submenu" class="header header--mobile-plp__submenu px-3 d-flex align-center" id="header--mobile-plp__submenu" :class="{ 'fixed': showSubMeu, 'hidden': hideSubMenu}">
            <template v-if="pageImage">
                <img :src="pageImage" :title="pageTitle" width="24" height="24" class="ml-2 br8 ov-h">
            </template>
            <div class="t16 w700 text-sGrayDarken2">{{ pageTitle }}</div>
        </div>
    </header>
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
            showSubMeu: false,
            hideSubMenu: true,
        };
    },

    props: {
        pageTitle: String,
        items: Array,
        pageReference: Object,
        pageSlug: {
            type: String,
            default: 'category'
        },
        submenu: Boolean,
        pageImage: String,
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
            //let currentScrollTop = window.scrollY;
            const header = document.getElementById('mobile-header');
            const filter = document.getElementById('filter-bg-mobile');

            const headerHeight = header.offsetHeight;

            if (this.isBanner) {
                if (window.scrollY > 40) {
                    this.hasBanner = false;
                    header.style.top = '0px';
                }
                if (window.scrollY <= 40) {
                    this.hasBanner = true;
                    header.style.top = `${40 - window.scrollY}px`;
                }
            }

            const filterParent = document.getElementById('filter-parent');

            if(filterParent){
                const filterOffset = filterParent.offsetTop;
                const margin = filterOffset - headerHeight;

                // Fix category sub menu and filter
                if(window.scrollY >= margin){
                    filter.classList.add('fixed');

                    if(this.submenu){
                        this.showSubMeu = true;
                        this.hideSubMenu = false;
                        filter.style.top = '89px'
                    }
                }else if(window.scrollY < margin){
                    filter.classList.remove('fixed')
                    
                    if(this.submenu){
                        this.showSubMeu = false;
                        this.hideSubMenu = true;
                    }
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
        position: fixed !important;
        top: 0px;

        &.has-banner {
            top: 40px;
        }

        .#{$parent}__logo-row {
            height: 48px;
            overflow: hidden;
            padding: 0 16px 0 !important;
            background: #fff;
            box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);
            position: relative;
            z-index: 3;

            .v-icon.mdi-chevron-right {
                font-size: 25px !important;
            }
        }
    }

    .header__search-box {
        flex-grow: 0 !important
    }

}

.#{$parent}--mobile-plp__submenu {
    height: 44px;
    width: 100%;
    position: absolute;
    top: 48px;
    right: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: 3;
    background: #fff;
    border-top: 1px solid #E8E8E8;

    &.hidden {
        opacity: 0;
    }

    &.fixed {
        opacity: 1;
    }

    img {
        width: 24px;
        height: 24px;
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

.filter-bg-mobile.fixed{
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);
}
</style>
