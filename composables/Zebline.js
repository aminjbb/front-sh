/**
 * Order composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default function setup() {

    const userToken = useCookie('userToken')
    const loginZebline = useCookie('loginZebline')
    const route = useRoute()

    /**
     * login user in zebline
     * @param {*} userId
     */
    async function zeblineLogin(userId){
        window.zebline.user.login(userId);
    }

    /**
     * logout user in zebline
     */
    async function zeblinLogout(){
        window.zebline.user.logout();
    }
    /**
     * set attribute user in zebline
     * @param {*} userData
     */
    async function zeblinSetAttribute(userData){
        window.zebline.user.setAttribute(userData);

    }
    /**
     * set attribute user in zebline
     * @param {*} eventName
     * @param {*} formData
     */
    async function zeblinEventTrack(eventName ,formData){
        window.zebline.event.track(eventName ,formData )

    }

    return {
        zeblineLogin,zeblinLogout
    }
}

