/**
 * Affiliate composable
 */
import axios from 'axios'


export default function setup() {
    /**
     * Send information to Takhfifan
     * @param {*} data 
     */
    async function sendInfoToTakhfifan(order) {
        const taToken = useCookie('tatoken')

        let productList = [];
        order?.details.forEach(item =>{
            const obj={
                price: Number(String(item.site_price).slice(0, -1)) ,
                quantity: item.count,	
                product_id: `${item?.shps?.sku?.id}`,
                name: item?.shps?.sku?.label,
                category: item?.shps?.sku?.category
            }
            productList.push(obj);
        });

        axios
            .post('https://analytics.takhfifan.com/track/purchase', {
                token: taToken.value,
                transaction_id: `${order?.id}` ,
                revenue: Number(String(order?.paid_price).slice(0, -1)),
                shipping: Number(String(order?.sending_price).slice(0, -1)),
                tax: order?.tax,
                discount: Number(String(order?.total_discount).slice(0, -1)),
                new_customer: order?.is_takhfifan,
                affiliation: 'takhfifan',
                coupon_code: order?.voucher_code,
                items: productList
            })
            .then((response) => {
                taToken.value = '';
            })
            .catch((err) => {
            });
    };

    /**
     * Send information to Deema
     * @param {*} order 
     */
    async function sendInfoToDeema(order) {
        const deemaToken = useCookie('dm-clickid')
        
        axios
            .get(`https://deemanetwork.com/api/v1/affiliate/22896/callback/store/server?clickid=${deemaToken.value}&orderRefCode=${order?.order_number}&totalPrice=${order?.paid_price}`, {
            })
            .then((response) => {
                deemaToken.value = ''
            })
            .catch((err) => {
            });
    };

    /**
     * Send information to Affilinks
     * All price should be "Toman"
     * @param {*} order 
     */
    async function sendInfoToTaAffilinks(order) {
        const alToken = useCookie('altoken')

        let productList = [];
        order?.details.forEach(item =>{
            const obj={
                price:Number(String(item?.site_price).slice(0, -1)) ,
                quantity: item?.count,	
                product_id: `${item?.shps?.sku?.id}`,
                name: item?.shps?.sku?.label,
                category: item?.shps?.sku?.category,
                category_id: `${item?.shps?.sku?.category_id}`,
            }
            productList.push(obj);
        });

        axios
            .post('https://affilinks.ir/api/v1/third-party/track-purchase', {
                token: alToken.value,
                order_id:`${order?.id}`,
                total: Number(String(order?.paid_price).slice(0, -1)),
                shipping: Number(String(order?.sending_price).slice(0, -1)),
                tax: Number(String(order?.tax).slice(0, -1)),
                discount: Number(String(order?.total_discount).slice(0, -1)),
                new_customer1: order?.is_affilink,
                coupon_code: order?.voucher_code,
                items: productList
            },
            {
                headers: {
                    authorization: '4e2c76387b9c5ea7e3d1ca0dcbbaa2af59caad8a96d8062ca98f445d92b51046',
                },
            })
            .then((response) => {
                alToken.value = '';
            })
            .catch((err) => {
            });
    };

    return{sendInfoToTakhfifan, sendInfoToDeema, sendInfoToTaAffilinks}
}