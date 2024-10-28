/**
 * Menu composable
 */
import { ref} from 'vue';
/* import { AxiosCall } from '~/utils/axios_call.js'
 */
import axios from 'axios'

export default function setup() {
    const menuList = ref([]);
    const loading = ref(false)

    /* async function getMenuList() {
        var hours = 1;
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (!setupTime) {
            loading.value = true
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'system/menu/crud/index?group=1'
            let data = await AxiosMethod.axios_get()
            
        }
        else {
            if(now-setupTime > hours*60*60*1000) {
                loading.value = true
                const AxiosMethod = new AxiosCall()
                AxiosMethod.end_point = 'system/menu/crud/index?group=1'
                let data = await AxiosMethod.axios_get()
                if (data) {
                    menuList.value= data.data
                    localStorage.setItem('menuList' , JSON.stringify(data.data))
                    loading.value = false
                }
                localStorage.setItem('setupTime', now)
            }
            else{
                menuList.value=  JSON.parse(localStorage.getItem('menuList'))
            }
        }

    }; */


    async function getMenuList() {
        var hours = 1;
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');

        if (!setupTime) {
            loading.value = true;
            axios
                .get(runtimeConfig.public.apiBase + `system/menu/crud/index?group=1`)
                .then((response) => {
                    if (response) {
                        menuList.value= response.data
                        localStorage.setItem('menuList' , JSON.stringify(response.data))
                        loading.value = false
                    }
                    localStorage.setItem('setupTime', now)
                })
                .catch((err) => {
                    
                });
        }
        else{
            if(now-setupTime > hours*60*60*1000) {
                loading.value = true;

                axios
                .get(runtimeConfig.public.apiBase + `system/menu/crud/index?group=1`)
                .then((response) => {
                    if (response) {
                        menuList.value= response.data
                        localStorage.setItem('menuList' , JSON.stringify(response.data))
                        loading.value = false
                    }
                    localStorage.setItem('setupTime', now)
                })
                .catch((err) => {
                    
                });
            }

            else{
                menuList.value=  JSON.parse(localStorage.getItem('menuList'))
            }
        }
    };

    return {getMenuList, menuList, loading  }
}

