<template lang="">
<v-layout>
    <v-row>
        <v-col sm="3">
            <userSidebar />
        </v-col>
        <v-col sm="9">
            {{userToken}}
            <v-card class="h-100" title="اطلاعات کاربری">
                <v-row class="pa-5">
                    <v-col sm="6">
                        <span> نام:</span>
                        <span> زهره</span>
                    </v-col>
                    <v-col sm="6">
                        <span> نام خانوادگی:</span>
                        <span> طباطبایی</span>
                    </v-col>
                    <v-col sm="6">
                        <span> شماره تماس:</span>
                        <span> 09393032760</span>
                    </v-col>
                    <v-col sm="6">
                        <span> ایمیل:</span>
                        <span>zohreh.tt@gmail.com</span>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-layout>
</template>

    
    
<script>
import auth from '@/middleware/auth';
export default {

    setup(){
        const userToken = useCookie('userToken')
    },

    methods: {
        async fetchUserProfile() {
            try {
                const userProfile = await auth.getUserProfile(this.$cookies.get('userToken'))
                // Use the userProfile data as needed
                console.log('User Profile Data:', userProfile)
            } catch (error) {
                // Handle errors
            }
        }
    },

    mounted() {
        fetchUserProfile();
    },

}
</script>
