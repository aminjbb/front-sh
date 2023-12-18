<template lang="">
<main class="v-user">
    <v-container>
        <v-row>
            <v-col
                cols="12"
                md="3">
                <generalSidebar />
            </v-col>
            <v-col cols="12" md="9" class="xs-hide">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border">
                    <span class="user-phone t16">خوش‌آمدید</span>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</main>
</template>
    
<script>
export default {

    data() {
        return {}
    },
}
</script>
