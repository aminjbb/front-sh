<template>
<section class="address-card">
    <div class="d-flex align-center justify-space-between">
        <div class="flex-grow-1 d-flex align-center address-card__info">
            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شهر / استان:</span>
                <span class="t12 w400 text-deep-purple">{{ address?.city?.label }} / {{  address?.state?.label }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">کد پستی:</span>
                <span class="t12 text-deep-purple number-font">{{ address?.postal_code }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شماره تماس:</span>
                <span class="t12 text-deep-purple number-font">{{ address?.phone_number }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">گیرنده:</span>
                <span class="t12 w400 text-deep-purple">{{ address?.receiver_full_name }} </span>
            </div>
        </div>
        <div class="address-card__actions mr-10">
            <div class="d-flex align-center xs-hide">
                <generalUserAddressModal
                    title="ویرایش آدرس"
                    buttonType="icon"
                    class="ml-5"
                    edit
                    :address="address"
                    :provinces="provinces"
                />

                <generalModalsDelete
                    title="حذف آدرس"
                    text="آیا از حذف این آدرس اطمینان دارید؟"
                    submitText="حذف آدرس"
                    buttonType="icon"
                    @removeProduct="removeAddress(address)" />
            </div>

            <div class="mobile-drop-down xs-show pos-r">
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
                                edit />
                        </li>

                        <li class="d-flex align-center py-1">
                            <generalModalsDelete
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
    <p class="t14 number-font text-grey-darken-3 mt-3">
        {{address?.address}}
    </p>
</section>
</template>

<script>
export default {
    props: {
        /** Address */
        address: Object,
        /** provinces */
        provinces: Object
    },

    methods: {
        removeAddress(address) {
            //TODO: Add remove address api
            console.log('address', address);
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

    > div:first-child{
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
