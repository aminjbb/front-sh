<template>
    <div class="wheel game-mobile-order">
        <div class="wheel__inner" id="wheel__inner" ref="circle">
            <div class="wheel__sec" v-for="(item, index) in items" :key="index" ref="children">
                <img data-not-lazy :src="item.desktop_image_url" :title="item.label" :alt="item.label"  />
            </div>
        </div>
        <div class="wheel__arrow"></div>
    </div>

    <v-btn :disabled="isLogin && clicked ? false : true" @click="start()" color="primary500" rounded="xl" type="submit" height="48px" class="w-100 game-auth__btn wheel__btn game-mobile-order">
        شانستو امتحان کن
    </v-btn>

    <div v-if="isLogin" class="wheel__limit mt-10">
        <div class="d-flex align-center justify-between-space">
            <v-icon icon="mdi-medal-outline" size="small" color="white" class="ml-2" />
            <span class="number-font text-bold t12 text-white">
                تعداد شانس: <span class="number-font text-bold">{{ countClicked }}</span> / <span class="number-font text-bold">{{ limit }}</span>
            </span>
        </div>
    </div>

    <v-dialog
            v-if="dialog"
            v-model="dialog"
            color="white"
            :fullscreen="screenType === 'mobile'? true : false"
            width="493px">
            <v-card class="game-modal pt-5 px-6 pb-5">
                <div>
                    <img data-not-lazy src="~/assets/images/game-modal.jpg" alt="گردونه" width="445" height="253" title="Shavaz Logo" class="w-100" />

                    <h2 class="game-title-mobile t20 w700 mb-2 text-grey-darken-3 mt-3">
                        {{ prize?.prize?.label }}
                    </h2>

                    <div class="t14 w400 l26 text-grey-darken-3 mb-8">
                        {{ prize?.prize?.description }}
                    </div>

                    <div class="game-modal__pink-box">
                        <h4 class="t17 w700 text-pink-darken-3 mb-3">همین الان خرید کن</h4>
                        <div class="d-flex align-center justify-space-between px-2 py-1">
                            <div class="voucher-code__code d-flex align-center cur-p" @click="doCopy(prize?.prize?.voucher_code)">
                                <v-icon icon="mdi-content-copy" class="ml-1" color="grey-darken-3" size="small"/>
                                <span class="t14 w700 text-grey-darken-3 ml-3">کپی کد</span>
                                <span class="text-grey-darken-1 t13 w500">{{ prize?.prize?.voucher_code }}</span>
                            </div>
                            <div class="voucher-code__link d-flex align-center">
                                <a href="/" class="t12 w700 text-primary">خرید از شاواز</a>
                                <v-icon icon="mdi-chevron-left" class="mr-2" color="primary" />
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-center justify-space-between game-modal__time">
                        <div class="d-flex align-center">
                            <v-icon icon="mdi-clock-outline" class="ml-1" color="primary" size="small"/>
                            <span class="t14 w700 text-primary ml-1">مدت زمان استفاده</span>
                        </div>

                        <span class="t14 w700 text-primary number-font text-bold">{{ prize?.prize?.deadline_for_use }} ساعت </span>
                    </div>

                    <v-btn
                        @click="closeModal()"
                        height="44"
                        title="امتحان کن"
                        class="btn btn--submit w-100">
                        دوباره امتحان کن
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
</template>

<script>
import {
  copyText
} from 'vue3-clipboard'
import Game from '@/composables/Game.js';

export default {
    data() {
        return {
            value: 3850,
            countClicked: 0,
            clicked: true,
            screenType: null,
            dialog:false,
            prize:{
                label:'کد تخفیف ٪ ۵۰ برای خرید کرم',
                description:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز .',
                code:'MPN25-NLOW1',
                deadline_for_use:'۱۲:۳۴:۴۵'
            }
        }
    },

    setup() {
        /**
         * Copy identification code
         * @param {*} code
         */
        const doCopy = (code) => {
            copyText(code, undefined, (error, event) => {
                if (error) {
                    useNuxtApp().$toast.error('کپی کد با مشکل مواجه شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                } else {
                    useNuxtApp().$toast.success('کد  با موفقیت کپی شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            })
        }

        const {
            getUserPrize,
            prize,
            } = new Game()

        return {
            getUserPrize,
            prize,
            doCopy,
        }
    },

    props: {
        items: Array,
        isLogin: Boolean,
        limit: String | Number,
        userUsed: String | Number,
    },

    mounted() {
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

        this.positionChildren();
    },

    methods: {
        /**
         * Calculate wheel children width and position
         */
        positionChildren() {
            const circle = this.$refs.circle;
            const children = this.$refs.children;
            const radius = circle.offsetWidth;

            const step = (2 * Math.PI) / children.length;
            const childSize = (2 * Math.PI * radius) / children.length / 2; // Dynamic size based on circumference

            const itemPosition = (radius / 2) - (childSize / 2)
            const degree = 360 / children.length;
            
            children.forEach((child, index) => {
                const itemTransform = index * degree;
                child.style.width = `${childSize}px`;
                child.style.transform = `rotate(${itemTransform}deg)`;
                child.style.right = `${itemPosition}px`;

                const angle = index * step;
                const x = radius + (radius - childSize / 2) * Math.cos(angle);
                const y = radius + (radius - childSize / 2) * Math.sin(angle);
            });
        },

        /**
         * Start lucky wheel
         */
        start() {
            this.getUserPrize();
        },

        /**
         * close modal
         */
        closeModal(){
            this.dialog = false;
        },

        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        },
    },

    watch: {
        prize(newVal){
            if(newVal && newVal !== null){
                if (this.countClicked < this.limit) {
                    this.countClicked++;
                    this.clicked = true;
                    document.getElementById('wheel__inner').style.transition = "none";
                    document.getElementById('wheel__inner').style.transform = "rotate(0deg)";

                    setTimeout(() => {
                        document.getElementById('wheel__inner').style.transition = "cubic-bezier(0.19, 1, 0.22, 1) 3s";
                        document.getElementById('wheel__inner').style.transform = `rotate(${newVal.degree}deg)`;
                       setTimeout(()=>{
                         this.dialog = true;
                       }, 2500)
                    }, 50);

                    this.$emit('updateForm',true)
                    if (this.countClicked == this.limit) {
                        this.clicked = false;
                    }
                }
            }
        },

      userUsed(newVal){
          this.countClicked = parseInt(newVal);
          if (newVal == this.limit) {
                this.clicked = false;
            }
      }
    }

}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.wheel {
    width: 436px;
    height: 436px;
    border-radius: 50%;
    border: solid 5px #AD1457;
    position: relative;
    overflow: hidden;

    @include gbp (0, 768) {
        width: 320px;
        height: 320px;
    }

    &__inner {
        width: 426px;
        height: 426px;
        border-radius: 50%;
        position: relative;
        overflow: hidden;

        @include gbp (0, 768) {
            width: 310px;
            height: 310px;
        }

        &::before {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border: 5px solid #fff;
            z-index: 2;
            content: '';
            border-radius: 50%;
        }
    }

    &__sec {
        position: absolute;
        top: -1px;
        height: 213px;
        border-color: transparent;
        transform-origin: 50% 100%;
        z-index: 1;

        @include gbp (0, 768) {
            height: 155px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    &__text {
        margin: 70px 0 0 70px;
    }

    &__arrow {
        width: 289px;
        height: 290px;
        background: url('~/assets/images/wheel-arrow.png') no-repeat center center;
        position: absolute;
        top: calc(50% - 144px);
        left: calc(50% - 144px);
        z-index: 3;
    }

    &__btn {
        margin-top: 80px
    }

    &__limit {
        border: 1px solid #D81B60;
        border-radius: 12px;
        padding: 8px 10px;
        
        @include gbp (0, 768) {
            margin-top:40px !important;
            margin-bottom: 27px !important;
        }
    }
}

.game-modal{
    &__pink-box{
        background: #FCE4EC;
        padding: 12px;
        border-radius: 10px;
    }

    &__time{
        border:1px solid #D81B60;
        padding:10px 16px;
        border-radius: 10px;
        margin:20px 0;
    }
}
</style>
