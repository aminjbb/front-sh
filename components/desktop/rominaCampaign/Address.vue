<template>
  <div>
    {{ userAddress }}
    <div v-if="userAddress && userAddress.length" class="">
        <div v-for="(address , index) in userAddress" :key="`address${index}`" class="d-flex">
            <div></div>
            <div class="d-flex flex-column">
                <p class="t14 number-font text-grey-darken-3 ">
                    {{address?.address}}
                </p>

                <div class="d-flex align-center">
                    <span class="t14 w600 text-grey-darken-3">گیرنده:</span>
                    <span class="t14 w400 text-grey-darken-3">{{ address?.receiver_full_name }} </span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'
import auth from '@/middleware/auth';
export default {

    data() {
        return {
            showAddress : false
        }
    },

    setup(){
        const userToken = useCookie('userToken');

        const {
            getUserAddress,
            userAddress
        } = new User()

        return {
            getUserAddress,
            userAddress,
            userToken
        }
    },

    watch:{
        openAddress(newVal){
            if(newVal === true){
                this.getUserAddress()
            }
        }
    }

}
</script>

<style>

</style>