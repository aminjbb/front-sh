<template lang="">
<header class="header header--mobile w-100" :class="{ 'fixed': isFixed, 'hidden': isHidden }">
    <div class="d-flex align-center">
        <a href="/" class="d-flex align-center header__logo" title="Shavaz logo">
            <img 
                src="~/assets/images/mobile-logo.svg"
                class=""
                alt="Shavaz Logo"
                width="79"
                height="28"
                title="Shavaz Logo" />
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
</header>
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

                if (currentScrollTop > this.lastScrollTop) {
                    this.isHidden = true;
                    this.isFixed = false;
                } else {
                    this.isFixed = true;
                    this.isHidden = false;
                }

                this.lastScrollTop = currentScrollTop;
            }
        },
    },
}
</script>

<style lang="scss">
$parent:'header';

.#{$parent} {
    &--mobile {
        position: fixed;
        top: 0;
        right: 0;
        overflow: hidden;
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        width: 100%;
        height: 56px;
        background: #fff;
        box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.10);
        padding: 8px;

        .#{$parent} {
            &__logo {
                margin-left: 16px;
            }

            &__search-box {
                flex: 1;
                height: 40px;

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
                .v-label {
                    font-size: 13px !important;
                }
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
</style>
