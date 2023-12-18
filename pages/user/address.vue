<template lang="">
<main class="v-user">
    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-card class="pa-5 mobile-pa-0 mobile-no-border">
                    <header class="d-flex align-center justify-space-between mb-5">
                        <span>آدرس‌های شما</span>
                        
                        <generalUserAddressModal title="ثبت آدرس جدید" buttonType="text"/>
                    </header>

                    <generalUserAddressCard />
                    <generalUserAddressCard />
                    <generalUserAddressCard />
                    <generalUserAddressCard />
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
export default {

}
</script>

<style lang="">
    
</style>
