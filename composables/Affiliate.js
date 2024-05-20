/**
 * Affiliate composable
 */
import axios from 'axios'


export default function setup() {
    /**
     * Send information to takhfifan
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

    return{sendInfoToTakhfifan, sendInfoToDeema}
}