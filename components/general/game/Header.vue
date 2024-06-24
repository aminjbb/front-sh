<template>
    <header >
        <div class="text-center align-center mx-5 py-3">
            <a href="/" title="Shavaz logo" >
                <img data-not-lazy src="~/assets/images/mobile-logo.svg"  alt="Shavaz Logo" width="107" height="36" title="Shavaz Logo" />
            </a>
            <a href="/">
                <v-icon color="white" class="float-left " @click="logout">mdi-logout</v-icon>
            </a>
        </div>

    </header>
</template>

<script>
export default {
    setup() {
        const userToken = useCookie('userToken')
        return {
            userToken,
        }
    },
    methods: {
        logout() {
            this.userToken = '';
             window.location = '/';
        },

    }

}
</script>

