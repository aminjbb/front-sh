<template lang="">
<div class="header-basket" id="basket-header">
    <header class="header-basket__header d-flex align-center justify-space-between pr-4 py-2">
        <div class="d-flex align-center ">
            <a href="/user/dashboard" class="ml-3">
                <v-icon icon="mdi-cart-minus" color="grey" />
            </a>
            <span class="text-grey w400 t13 number-font">سبد خرید ({{dataMoc?.shps.length ? dataMoc?.shps.length : 0}} کالا)</span>
        </div>

        <v-btn
            class="pa-0 text-none"
            @click="close()"
            color="grey-darken-1"
            width="50"
            variant="icon">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </header>

    <template v-if="dataMoc?.shps && dataMoc?.shps.length">
        <div class="header-basket__content header-basket__content--no-empty">
            <div>
                <template v-for="(item, index) in dataMoc.shps" :key="`header-product${index}`">
                    <mobileCartProductCard :content="item" />

                    <v-divider v-if="index + 1 < dataMoc.shps.length" color="grey" />
                </template>
            </div>
        </div>

        <div class="header-basket__price">
            <div class="d-flex align-center justify-space-between">
                <span class="t14 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
                <span class="t19 w400 text-grey-darken-3 number-font">{{splitChar(dataMoc.paid_price)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
            </div>

            <p class="text-green t12 w400 pt-1 number-font">میزان سود شما از این خرید {{splitChar(dataMoc.total_price - dataMoc.paid_price)}} می‌باشد.</p>

            <div class="d-flex align-center justify-center mt-5 w-100">
                <v-btn
                    href="/products"
                    height="44"
                    title="مشاهده کالاهای بیشتر"
                    class="btn btn--submit ml-3 w-50">
                    مشاهده کالاهای بیشتر
                </v-btn>

                <v-btn
                    href="/cart"
                    height="44"
                    title="تکمیل سفارش"
                    class="btn btn--cancel w-50">
                    تکمیل سفارش
                </v-btn>
            </div>
        </div>
    </template>

    <div v-else class="header-basket__content header__basket__content--empty">
        <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
            <div>
                <svgEmptyCart />
            </div>
            <h2 class="t13 w400 text-grey-darken-1 mt-5">سبد خرید شما خالی است!</h2>
            <v-btn
                href="/product"
                title="مشاهده محصولات"
                class="mt-5 btn btn--cancel">
                مشاهده محصولات
            </v-btn>
        </div>

        <div class="pa-3">
            <v-row>
                <v-col
                    v-for="(product, index) in suggestProductsMoc"
                    :key="`product${index}`"
                    sm="6">
                    <generalProductSimpleCard :image="product.image.image_url" :label="product.label" />
                </v-col>
            </v-row>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            suggestProducts: [],
            suggestProductsMoc: [{
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'کرم نرم کننده حاوی عصاره جوجوبا مای ظرفیت 150 میلی لیتر '
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'مداد چشم گلدن رز مدل Dream کد 406'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا'
                },
            ],
            data: null,
            dataMoc: {
                "total_price": 4200000,
                "paid_price": 3780000,
                shps: [{
                        image: {
                            image_url: 'products.jpg',
                        },
                        label: 'ماسک مو فولیکا مدل Arginine B حجم 200 میلی لیتر به همراه شامپو مو فولیکا حجم 400 میلی لیتر و هدیه سرم براق کننده مو فولیکا مدل Detanglin حجم 200 میلی لیتر',
                        color: {
                            label: 'مشکی',
                            code: '#000',
                        },
                        shopping_name: 'زیبارویان',
                        customer_price: 184030,
                        available: false,
                        site_price: 269900,
                        discount: 30,
                        count: 2,
                        status: 'change_price'
                    },
                    {
                        image: {
                            image_url: 'products.jpg',
                        },
                        label: 'شامپو تقویت کننده و ضد ریزش مو فولیکا',
                        color: {
                            label: 'مشکی',
                            code: '#000',
                        },
                        shopping_name: 'زیبارویان',
                        customer_price: 184030,
                        available: true,
                        site_price: 269900,
                        discount: null,
                        count: 2,
                        status: 'change_price'
                    },
                    {
                        image: {
                            image_url: 'products.jpg',
                        },
                        label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه',
                        color: {
                            label: 'مشکی',
                            code: '#000',
                        },
                        shopping_name: 'زیبارویان',
                        customer_price: 184030,
                        site_price: 269900,
                        available: false,
                        discount: 30,
                        count: 0,
                        status: null
                    }
                ]
            }
        }
    },

    methods: {
        close() {
            document.getElementById('basket-header').classList.remove('show');
            document.body.classList.remove('active-basket');
        }
    }
}
</script>

<style lang="scss">
.header-basket {
    width: 358px;
    height: 80vh;
    border-radius: 0px 8px 8px 0px;
    background: #FFF;
    box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    display: none;
    z-index: 12;

    &.show {
        display: block !important;
    }

    &__header {
        border-bottom: 1px solid #BDBDBD;
    }

    &__content {
        height: calc(100% - 53px);
        overflow: hidden;

        &--empty {
            >div:first-child {
                height: 287px;
            }

            >div:last-child {
                overflow-x: hidden;
                height: calc(100% - 284px);
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 4px !important;
                }

                &::-webkit-scrollbar-track {
                    border-radius: 4px;
                    background-color: #EEEEEE;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: #BDBDBD;
                }
            }

            .product-card--simple {
                border-radius: 8px;
                border: 1px solid var(--grey-grey-lighten-2, #E0E0E0);
                height: 100%;

                h3 {
                    text-align: right !important;
                    font-variation-settings: "wght"500 !important;
                }
            }
        }

        &--no-empty {
            overflow-x: hidden;
            height: calc(100% - 53px);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px !important;
            }

            &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #EEEEEE;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: #BDBDBD;
            }
        }
    }

    &__price {
        position: absolute;
        width: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0px 0px 8px 0px;
        background: #FFF;
        box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
        padding: 16px;
    }
}
</style>
