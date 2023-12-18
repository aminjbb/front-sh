<template lang="">
<section class="address-card">
    <div class="d-flex align-center justify-space-between">
        <div class="flex-grow-1 d-flex align-center justify-space-between">
            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شهر / استان:</span>
                <span class="t12 w400 text-deep-purple">تهران / تهران</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">کد پستی:</span>
                <span class="t12 text-deep-purple number-font">1863764032</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شماره تماس:</span>
                <span class="t12 text-deep-purple number-font">09303932560</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">گیرنده:</span>
                <span class="t12 w400 text-deep-purple">نگین اسدی</span>
            </div>
        </div>
        <div class="address-card__actions mr-10">
            <div class="d-flex align-center justify-space-between">
                <generalUserAddressModal title="ویرایش آدرس" buttonType="icon" class="ml-5" edit/>

                <generalModalsDelete
                    title="حذف آدرس"
                    text="آیا از حذف این آدرس اطمینان دارید؟"
                    submitText="حذف آدرس"
                    @removeProduct="removeAddress(address)" />
            </div>
        </div>
    </div>
    <p class="t14 number-font text-grey-darken-3 mt-3">
        بزرگراه جلال آل احمد، زیر پل آزمایش، ضلع جنوب شرقی جلال، کوچه کوی نویسندگان، مجتمع کوی نویسندگان، بلوک ۷، واحد ۱۵
    </p>
</section>
</template>

<script>
export default {
    props: {
        /** Address */
        address: Object
    },

    methods: {
        removeAddress(address) {
            //TODO: Add remove address api
            console.log('address', address);
        }
    },

}
</script>

<style lang="scss">
.address-card {
    border-bottom: 1px solid #eee;
    padding: 20px 0;

    .mdi-circle {
        font-size: 4px !important;
        margin-left: 4px;
    }
}
</style>
