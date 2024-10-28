/**
 * Menu composable
 */
import { ref} from 'vue';
import axios from 'axios'

export default function setup() {
    const menuList = ref([]);
    const loading = ref(false);
    const runtimeConfig = useRuntimeConfig();

    async function getMenuList() {
        var hours = 1;
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');

        if (!setupTime) {
            loading.value = true;
            axios
                .get(runtimeConfig.public.apiBase + `/system/menu/crud/index?group=1`)
                .then((response) => {
                    if (response) {
                        menuList.value= response.data.data
                        localStorage.setItem('menuList' , JSON.stringify(response.data.data))
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
                .get(runtimeConfig.public.apiBase + `/system/menu/crud/index?group=1`)
                .then((response) => {
                    if (response) {
                        menuList.value= response.data.data
                        localStorage.setItem('menuList' , JSON.stringify(response.data.data))
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

