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
                price: item.site_price,
                quantity: item.count,	
                product_id: item?.shps?.sku?.id,
                name: item?.shps?.sku?.label,
                category: item?.shps?.sku?.category
            }
            productList.push(obj);
        });

        axios
            .post('https://analytics.takhfifan.com/track/purchase', {
                token: taToken.value,
                transaction_id: order?.transaction_id ,
                revenue: order?.paid_price,
                shipping: order?.sending_price,
                tax: order?.tax,
                discount: order?.total_discount,
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
                price: Number(String(item?.site_price).slice(0, -1)),
                quantity: item?.count,	
                product_id: item?.shps?.sku?.id,
                name: item?.shps?.sku?.label,
                category: item?.shps?.sku?.category,
                category_id: item?.shps?.sku?.category_id,
            }
            productList.push(obj);
        });

        axios
            .post('https://affilinks.ir/api/v1/third-party/track-purchase', {
                token: alToken.value,
                order_id:order?.id,
                total: Number(String(order?.paid_price).slice(0, -1)),
                shipping: Number(String(order?.sending_price).slice(0, -1)),
                tax: Number(String(order?.tax).slice(0, -1)),
                discount: Number(String(order?.total_discount).slice(0, -1)),
                new_customer1: order?.is_affilinks,
                coupon_code: order?.voucher_code,
                items: productList
            })
            .then((response) => {
                alToken.value = '';
            })
            .catch((err) => {
            });
    };

    return{sendInfoToTakhfifan, sendInfoToDeema, sendInfoToTaAffilinks}
}