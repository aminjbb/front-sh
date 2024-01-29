<template>
<section class="address-card">
    
    <div class="d-flex align-center justify-space-between">
        <p class="t14 number-font text-grey-darken-1 l25 ma-0">
            {{address?.address}}
        </p>

        <div class="address-card__actions mr-10">
            <div class="mobile-drop-down pos-r">
                <v-icon
                    icon="mdi-dots-vertical"
                    color="grey"
                    @click="openDropDown(id)" />

                <nav class="mobile-drop-down__items pos-a" :id="`mobile-drop-down__items-${id}`">
                    <ul class="ma-0">
                        <li class="mb-2">
                            <generalUserAddressModal
                                title="ویرایش آدرس"
                                buttonType="mobile"
                                :userDetail="userDetail"
                                :getUserAddress="getUserAddress"
                                edit
                                :address="address"
                                :provinces="provinces" />
                        </li>

                        <li class="d-flex align-center py-1">
                            <generalModalsDelete
                                :getUserAddress="getUserAddress"
                                title="حذف آدرس"
                                text="آیا از حذف این آدرس اطمینان دارید؟"
                                submitText="حذف آدرس"
                                buttonType="mobile"
                                @removeProduct="removeAddress(address)" />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import axios from "axios";
import auth from "~/middleware/auth.js";

export default {
    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');
        return {
            runtimeConfig,
            userToken
        }
    },
    props: {
        /** get User Address */
        getUserAddress: {
            type: Function
        },

        /** User Detail */
        userDetail: Object,

        /** Address */
        address: Object,

        /** provinces */
        provinces: Object
    },

    methods: {
        removeAddress(address) {
            axios
                .delete(this.runtimeConfig.public.apiBase + `/user/profile/address/delete/${address.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    this.dialog = false
                })
                .catch((err) => {
                    auth.checkAuthorization(err.response)
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.loading = false
                    this.getUserAddress()
                });
        },

        openDropDown(id) {
            const itemDropdown = document.getElementById(`mobile-drop-down__items-${id}`);
            itemDropdown.classList.toggle('show');
        }
    },

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.address-card {
    border-bottom: 1px solid #eee;
    padding: 20px 0;

    .mdi-circle {
        font-size: 4px !important;
        margin-left: 4px;
    }

    >div:first-child {
        @include gbp(0, 1280) {
            align-items: flex-start !important;
        }
    }

    &__info {
        @include gbp(0, 1280) {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

        >div {
            @include gbp(1280) {
                padding-left: 7%;
            }

            @include gbp(0, 1280) {
                margin-bottom: 10px !important;
            }
        }
    }
}
</style>
