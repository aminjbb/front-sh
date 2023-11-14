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
@import '~/assets/scss/components/mobile/general/header.scss';
</style>
