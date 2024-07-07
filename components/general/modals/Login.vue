<template>
<div class="c-modal">
    <v-dialog v-if="dialog" v-model="dialog" color="white" width="724px" height="507px">
        <div class="voucher-auth voucher-auth--desktop bg-white px-10 py-15 h-100">
            <div class="close-modal cur-p" @click="closeModal()">
                <v-icon color="grey-darken-1">mdi-close</v-icon>
            </div>

            <v-row :align="voucherStep ?'start' : 'center'" class="h-100">
                <v-col sm="7" class="pl-7">
                    <h4 class="t17 w700 l30" :class="voucherStep ?'mb-10 pb-10' : ''">{{ title }}</h4>
                    <generalAuth v-if="!voucherStep" class="pt-5" @userInfo="getUserInfo" @backToSite="closeModal" noLogo noTitle showCancel loginDesc="شماره موبایل خود را وارد نمایید." />

                    <div v-else>
                        <span class="t14 w400 mt-15 d-block text-grey-darken-3">کد تخفیف شما :</span>
                        <div class="voucher-auth__code d-flex align-center cur-p" @click="doCopy(voucher_code)">
                            <span class="text-grey-darken-1 t13 w500 flex-grow-1">{{ voucher_code }}</span>
                            <span class="t14 w700 text-primary ml-3">کپی</span>
                            <v-icon icon="mdi-content-copy" class="ml-1" color="primary" size="small" />
                        </div>
                    </div>
                </v-col>
                <v-col sm="5" class="d-flex align-center justify-center flex-column">
                    <div v-if="voucherStep" class="px-5 mb-15 pt-15">
                        <img data-not-lazy :src="imageAddress(voucherImage)" width="222" height="182" class="mt-10"/>
                        <div class="t16 w500 mt-15 d-block text-grey-darken-3 text-center">به شاواز خوش آمدید ...</div>
                    </div>
                    <img v-else data-not-lazy :src="imageAddress(image)" width="272" height="284" />
                </v-col>
            </v-row>
        </div>
    </v-dialog>
</div>
</template>

<script>
import {
    copyText
} from 'vue3-clipboard'

export default {

    data() {
        return {
            dialog: false,
            loading: false,
            voucherStep: false,
            voucher_code: 'new_guest'
        }
    },

    props: {
        /** Modal title */
        title: String,

        /** Image */
        image: String,

        /** Voucher  */
        voucher: String,

        /** Voucher image */
        voucherImage: String,

        signupStatus: Boolean
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
    },

    methods: {
        /**
         * Open modal
         */
        openModal() {
            setTimeout(() => {
                if (this.signupStatus === true) {
                    this.dialog = true
                }
            }, 5000);
        },

        /**
         * Close modal
         */
        closeModal() {
            this.dialog = false;

            if(this.voucherStep === true){
                window.location.reload();
            }
        },

        /**
         * Get user info
         * @param {*} user 
         */
         getUserInfo(user) {
            if (user.has_order === false) {
                this.voucherStep = true;
                this.voucher_code = user?.voucher_code

            } else {
                this.dialog = false;
                window.location.reload();
            }
        },
        //09383439367

        /**
         * Get image address
         * @param {*} path 
         */
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/' + path]
        },
    },

    mounted() {
        this.openModal();
    }
}
</script>

<style lang="scss">
$parent: 'voucher-auth';

.#{$parent} {
    position: relative;

    &--desktop {
        border-radius:8px !important ;
        .game-auth__desc {
            margin-bottom: 20px !important;
        }

        .game-auth__input {
            margin-bottom: 70px;
        }

        .close-modal {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 20px;
            left: 15px;
            border-radius: 50%;
        }

        .#{$parent}__code {
            border-radius: 4px;
            border: 1px solid #9E9E9E;
            margin-top: 10px;
            height: 50px;
            padding: 10px;
            color: black;
            font-size: 18px;

            >span:first-child {
                font-size: 15px;
                color: black !important;
            }
        }
    }
}
</style>
