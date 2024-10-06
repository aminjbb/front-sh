<template>
  <section class="hero">
    <img class="hero__bg-img xs-hide" src="~/assets/images/should-delete/main-hero.jpg" alt="Shavaz Logo" width="100%" title="Hero" />
    <img class="hero__bg-img xs-show" src="~/assets/images/should-delete/main-hero-mbile.jpg" alt="Shavaz Logo" width="100%" title="Hero" />

    <div class="hero__content">
            <v-row class="h-100">
                <v-col cols="12" sm="5" class="hero__text">
                    <img class="hero__logo mb-2" src="~/assets/images/should-delete/romina-logo.svg" width="141" height="29"/>
                    <span class="romina-primary w700 mb-3" :class="screenType === 'desktop' ? 't22' : 't16'">هر روز بدرخشی! </span>
                    <h1 class="w700 text-sGrayDarken2 mb-2" :class="screenType === 'desktop' ? 't20 l40' : 't14 l26'">فصل جدید و داستان جدید برای سلامت پوست و موهات خلق کن.</h1>
                    <p class="w300 text-sGrayDarken2" :class="screenType === 'desktop' ? 't20 l40' : 't12 l27'"> درخشش پوستت و زیبایی ابریشمی موهات با فرمولاسیون پیشرفته محصولات رومینا محقق می‌شود.  برند رومینا با تمرکز بر زیبایی و درخشندگی، محصولات متنوعی برای مراقبت از پوست و مو ارائه می‌دهد.</p>
                </v-col>
                <v-col cols="6" sm="2" :class="screenType === 'desktop' ? '' : 'd-flex justify-center align-end pb-10'">
                    <div class="hero__sku d-flex flex-column align-center" :class="screenType === 'desktop' ? 'justify-center' : 'justify-start'">
                        <img :src="currentImage" width="126" height="274" class="mb-6"/>

                        <a class="d-flex align-center" href="#romina-sku-list">
                            <span class="romina-primary t16 w700">مشاهده بیشتر</span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M20.6397 17.6399L15.5863 10.9066H8.10633C6.82633 10.9066 6.18633 12.4533 7.093 13.3599L13.9997 20.2666C15.1063 21.3733 16.9063 21.3733 18.013 20.2666L20.6397 17.6399Z" fill="#1F74C9"/>
                            <path d="M23.8936 10.9066H15.5869L20.6402 17.6399L24.9202 13.3599C25.8136 12.4533 25.1736 10.9066 23.8936 10.9066Z" fill="#1F74C9"/>
                            </svg>
                        </a>
                    </div>
                </v-col>
                <v-col cols="6" sm="5" class="hero__main-image d-flex justify-end" :class="screenType === 'desktop' ? '' : 'align-end'">
                    <img class="hero__model-image" src="~/assets/images/should-delete/main-hero-img.png"/>
                </v-col>
            </v-row>    
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            currentImage: '',
            screenType:'desktop',
            images: [
                'romina01.svg',
                'romina02.svg',
                'romina03.svg'
            ],
        }
    },
    
    methods: {
        changeImage() {
            const assets =
                import.meta.glob('~/assets/images/campaign/*', {
                    eager: true,
                    import: 'default',
                })

            this.currentImage = assets['/assets/images/campaign/' + this.images[this.currentIndex]]
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
    },

    mounted() {
        this.currentImage = this.images[0];
        setInterval(this.changeImage, 2000);

        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/tools/bp";

.hero{
    position: relative;
    display: flex;

    &__bg-img{
        height: 460px;
        overflow: hidden;

        @include gbp(0, 769) {
           height:491px;
        }
    }

    &__content{
        width: 100%;
        position: absolute;
        height: 460px;
        bottom: 0;
        right: 0;

        @include gbp(0, 769) {
           height:515px !important;
           top:0 !important;
           padding: 0;
        }
    }

    &__logo{
        @include gbp(0, 769) {
            width: 100px !important;
           height:20px !important;
        }
    }

    &__text{
        padding-right: 64px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;

        @include gbp(0, 769) {
            padding: 24px 40px 0 !important;
            height: auto !important;
        }
    }

    &__sku{
        height: 100%;

        @include gbp(0, 769) {
            height: auto;
        }

        img{

            @include gbp(769, 992) {
                width: 81px !important;
                height: 220px !important;
                
            }

            @include gbp(0, 769) {
                width: 38px !important;
                height: 114px !important;
                margin-bottom: 10px !important;
            }
        }
    }

    &__model-image{
        width: auto;
        height: auto;
        margin-top: -48px;
        max-width: 100%;

        @include gbp(0, 769) {
            width: 169px !important;
            height: 178px !important;
            margin-top:0 !important ;
        }
    }
}
</style>