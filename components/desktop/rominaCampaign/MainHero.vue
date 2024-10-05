<template>
  <section class="hero">
    <img class="hero__bg-img" src="~/assets/images/should-delete/main-hero.jpg" alt="Shavaz Logo" width="100%" title="Hero" />

    <div class="hero__content">
            <v-row class="h-100">
                <v-col sm="5" class="hero__text">
                    <img src="~/assets/images/should-delete/romina-logo.png" width="141" height="29" class="mb-2"/>
                    <span class="romina-primary t22 w700 mb-3">هر روز بدرخشی! </span>
                    <h1 class="t20 w700 l40 text-sGrayDarken2 mb-2">فصل جدید و داستان جدید برای سلامت پوست و موهات خلق کن.</h1>
                    <p class="t20 w300 l40 text-sGrayDarken2"> درخشش پوستت و زیبایی ابریشمی موهات با فرمولاسیون پیشرفته محصولات رومینا محقق می‌شود.  برند رومینا با تمرکز بر زیبایی و درخشندگی، محصولات متنوعی برای مراقبت از پوست و مو ارائه می‌دهد.</p>
                </v-col>
                <v-col sm="2">
                    <div class="hero__sku d-flex flex-column align-center justify-center">
                        <img :src="currentImage" width="126" height="274" class="mb-6"/>

                        <a class="d-flex align-center">
                            <span class="romina-primary t16 w700">مشاهده بیشتر</span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M20.6397 17.6399L15.5863 10.9066H8.10633C6.82633 10.9066 6.18633 12.4533 7.093 13.3599L13.9997 20.2666C15.1063 21.3733 16.9063 21.3733 18.013 20.2666L20.6397 17.6399Z" fill="#1F74C9"/>
                            <path d="M23.8936 10.9066H15.5869L20.6402 17.6399L24.9202 13.3599C25.8136 12.4533 25.1736 10.9066 23.8936 10.9066Z" fill="#1F74C9"/>
                            </svg>
                        </a>
                    </div>
                </v-col>
                <v-col sm="5" class="hero__main-image d-flex justify-end">
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
            images: [
                '~/assets/images/should-delete/romina03.png',
                '~/assets/images/should-delete/romina03.png',
                '~/assets/images/should-delete/romina03.png'
            ],
        }
    },
    
    methods: {
        changeImage() {
            this.currentImage = this.images[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
    },

    mounted() {
        this.currentImage = this.images[0];
        setInterval(this.changeImage, 3000);
    }
}
</script>

<style scoped lang="scss">
.hero{
    position: relative;
    display: flex;

    &__bg-img{
        height: 460px;
        overflow: hidden;
    }

    &__content{
        width: 100%;
        position: absolute;
        height: 460px;
        bottom: 0;
        right: 0;
    }

    &__text{
        padding-right: 64px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    &__sku{
        height: 100%;
    }

    &__model-image{
        width: 68%;
        height: auto;
        margin-top: -48px;
    }
}
</style>