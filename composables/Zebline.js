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
        try {
            window.zebline.user.login(userId);
        }
        catch (e) {

        }
    }

    /**
     * logout user in zebline
     */
    async function zeblinLogout(){
        try {
            window.zebline.user.logout();
        }
        catch (e) {

        }
    }
    /**
     * set attribute user in zebline
     * @param {*} userData
     */
    async function zeblinSetAttribute(userData){
        try {
            window.zebline.user.setAttribute(userData);
        }
        catch (e) {

        }

    }
    /**
     * set attribute user in zebline
     * @param {*} eventName
     * @param {*} formData
     */
    async function zeblinEventTrack(eventName ,formData){
       try {
           window.zebline.event.track(eventName ,formData )
       }
       catch (e) {

       }
    }

    return {
        zeblineLogin,zeblinLogout ,zeblinEventTrack
    }
}

