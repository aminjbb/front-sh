<template>
<div class="voucher-list">
    <template v-if="voucherList && voucherList.length">
        <div v-for="voucher in voucherList" :key="`vouceher${voucher.id}`" class="voucher-card mb-4">
            <div class="voucher-card__info d-flex align-center px-4 py-3">


                <div class="">
                    <h2 class="text-grey-darken-4 t18 w700 mb-2">{{ voucher.label }}</h2>

                    <div class="d-flex align-center">
                        <v-icon icon="mdi-clock-outline" class="ml-1" color="primary" size="small"/>
                        <span class="t14 w700 text-primary ml-1">مدت زمان استفاده</span>
                        <span class="t14 w700 text-red number-font text-bold">{{ voucher.deadline_for_use }}</span>
                    </div>
                </div>
            </div>

            <div class="d-flex align-center justify-space-between pa-4">
                <div class="voucher-code__code d-flex align-center cur-p" @click="doCopy(voucher.voucher_code)">
                    <v-icon icon="mdi-content-copy" class="ml-1" color="primary" size="small"/>
                    <span class="t16 w700 text-primary ml-3">کپی کد</span>
                    <span class="text-grey-darken-1 t13 w500">{{ voucher.voucher_code }}</span>
                </div>
                <div class="voucher-code__link d-flex align-center">
                    <a href="/" class="t14 w700 text-primary">خرید از شاواز</a>
                    <v-icon icon="mdi-chevron-left" class="mr-2" color="primary" />
                </div>
            </div>
        </div>
    </template>
    
    <template v-else>
        <div class="voucher-card d-flex align-center justify-center flex-column pa-5">
            <img data-not-lazy src="~/assets/images/voucher-cat.png" alt="no voucher" width="100" height="81" title="no voucher" class="mb-3" />
            <h3 class="text-black t20 w700 mb-2">شانست رو امتحان نکردی</h3>
            <p class="text-grey-darken-1 t15 w500">کاربر شاوازی روی دکمه <span class="text-primary500">شانست رو امتحان کن</span> کلیک کنین</p>
        </div>
    </template>
</div>
</template>

<script>
import {
  copyText
} from 'vue3-clipboard'

export default {
    props: {
        voucherList: Array
    },

    setup() {
        /**
         * Copy identification code
         * @param {*} code
         */
        const doCopy = (code) => {
          console.log(code)
            copyText(code, undefined, (error, event) => {
                if (error) {
                  console.log(error)
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

        return {
            doCopy,
        }
    }
}
</script>

<style lang="scss" scoped>
.voucher-card {
    background: white;
    border-radius: 15px;

    &__info{
        border-bottom: 1px dashed rgba(154, 154, 154, 0.2);

        img{
            width:50px;
            height: 50px;
            border-radius: 10px;
            margin-left: 10px;
        }
    }
}
</style>
