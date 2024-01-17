/**
 * Home composable
 */
import { ref} from 'vue';
import axios from 'axios'

export default function setup(posts) {
    const userAddress = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    async function getUserAddress() {
        axios
            .get(runtimeConfig.public.apiBase +`/user/profile/address`,{
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                userAddress.value = response.data.data
            })
            .catch((err) => {

            });
    };

    return {getUserAddress, userAddress, loading  }
}

