/**
 * A composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import {useStore} from "vuex";


export default function setup() {
    /**
     * Send information to takhfifan
     * @param {*} data 
     */
    async function sendInfoToTakhfifan(data) {
        axios
            .post('https://analytics.takhfifan.com/track/purchase', {
                shps: shps,
                count: countMain ,
                identifier: number
            })
            .then((response) => {
                voucher.value = response.data.data
            })
            .catch((err) => {
                if(err.response.data){
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            });
    };
}