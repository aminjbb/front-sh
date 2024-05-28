<template>
    <div class="wheel">
        <div class="wheel__inner" id="wheel__inner" ref="circle">
            <div class="wheel__sec" v-for="(item, index) in items" :key="index" ref="children">
                <img data-not-lazy :src="imageAddress(item.image)" :title="item.title" :alt="item.title" />
            </div>
        </div>
        <div class="wheel__arrow"></div>
    </div>

    <v-btn :disabled="isLogin && clicked ? false : true" @click="start()" color="primary500" block rounded="xl" type="submit" height="48px" class="game-auth__btn wheel__btn">
        شانستو امتحان کن
    </v-btn>

    <div class="wheel__limit mt-10">
        <div class="d-flex align-center justify-between-space">
            <v-icon icon="mdi-medal-outline" size="small" color="white" class="ml-2" />
            <span class="number-font text-bold t12 text-white">
                تعداد شانس: <span class="number-font text-bold">{{ countClicked }}</span> / <span class="number-font text-bold">{{ limit }}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 3850,
            countClicked: 0,
            clicked: true,
            limit: 3
        }
    },

    props: {
        items: Array,
        isLogin:Boolean
    },

    mounted() {
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
            if (this.countClicked < this.limit) {
                this.countClicked++;
                this.clicked = true;
                document.getElementById('wheel__inner').style.transition = "none";
                document.getElementById('wheel__inner').style.transform = "rotate(0deg)";

                setTimeout(() => {
                    document.getElementById('wheel__inner').style.transition = "cubic-bezier(0.19, 1, 0.22, 1) 3s";
                    document.getElementById('wheel__inner').style.transform = `rotate(${this.value}deg)`;
                }, 50);

                if (this.countClicked == this.limit) {
                    this.clicked = false;
                }
            }
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
    }
}
</script>

<style lang="scss" scoped>
.wheel {
    width: 436px;
    height: 436px;
    border-radius: 50%;
    border: solid 5px #AD1457;
    position: relative;
    overflow: hidden;

    &__inner {
        width: 426px;
        height: 426px;
        border-radius: 50%;
        position: relative;
        overflow: hidden;

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
        height: 214px;
        border-color: transparent;
        transform-origin: 50% 100%;
        z-index: 1;

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
    }
}
</style>
