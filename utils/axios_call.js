import axios from "axios";
import qs from "qs";
import { useRouter, useRoute } from 'vue-router'
// var FormData = require('form-data');
const NUXT_PUBLIC_API_BASE = "https://api.shvz.ir/api"

export class AxiosCall {
    constructor() {
        this.version = "v1";
        this.end_point = "";
        this.form = new FormData();
        this.using_auth = false;
        this.cookies = null;
        this.token = ''
        this.store = null;
        this.toast_success = false;
        this.toast_success_message = null;
        this.toast_error = false;
        this.toast_error_message = null;
    }
    async axios_image_upload() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            NUXT_PUBLIC_API_BASE,
            "/",
            this.version,
            "/",
            this.end_point

        );
        let data = false;
        if (this.using_auth) {

            await axios
                .post(url, this.form, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                    'Content-Type': 'multipart/form-data'
                })
                .then((response) => {
                    if (this.toast_success) {

                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    useNuxtApp().$toast.error('تو فرایند آپلود به مشکلی خوردیم', {
                        rtl: true,
                        position: 'top-center',
                        theme:'dark'
                    });
                });
        } else {
            await axios
                .post(url, this.form)
                .then((response) => {

                    if (this.toast_success) {
                        openToast(this.store, response.data.message, "success")
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    useNuxtApp().$toast.error('تو فرایند آپلود به مشکلی خوردیم', {
                        rtl: true,
                        position: 'top-center',
                        theme:'dark'
                    });
                });
        }
        return data;
    }
    async axios_post() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            NUXT_PUBLIC_API_BASE,
            "/",
            this.version,
            "/",
            this.end_point

        );
        let data = false;
        const cookies = useCookie();
        if (this.using_auth) {
            await axios
                .post(url, this.form, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.data.message){
                        useNuxtApp().$toast.error(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (err.response.status == 422) {

                        const details = err.response.data.details
                        const key = Object.keys(details)
                        if (key[0] == 'name') {
                            useNuxtApp().$toast.error('فیلد نام باید یکتا باشد', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        }
                        else if (key[0] == 'label') {
                            useNuxtApp().$toast.error('فیلد لیبل باید یکتا باشد', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        }

                        else if (key[0] == 'email') {
                            useNuxtApp().$toast.error('فیلد لیبل باید یکتا باشد', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        } else if (key[0] == 'phone_number') {
                            useNuxtApp().$toast.error( 'فیلد شماره موبایل باید یکتا باشد', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        }else if (key[0] == 'identification_code') {
                            useNuxtApp().$toast.error( 'کد ملی وارد شده قبلا استفاده شده است', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        }else if (key[0] == 'email') {
                            useNuxtApp().$toast.error(  'ایمیل وارد شده قبلا استفاده شده است', {
                                rtl: true,
                                position: 'top-center',
                                theme:'dark'
                            });
                        }
                    }

                });
        } else {
            await axios
                .post(url, this.form)
                .then((response) => {

                    if (this.toast_success) {
                        useNuxtApp().$toast.success(  response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.data.message){
                        useNuxtApp().$toast.error(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (err.response.status == 442) {
                        const details = err.response.data.details
                        const key = Object.keys(details)
                        useNuxtApp().$toast.error(key, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        }
        return data;
    }
    async axios_put() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            NUXT_PUBLIC_API_BASE,
            "/",
            this.version,
            "/",
            this.end_point,
            "/"
        );
        let data = false;
        const cookies = Cookie();
        if (this.using_auth) {
            await axios
                .put(url, this.form, {
                    headers: {
                        Authorization:
                            "Bearer " + cookies.get('token'),
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        useNuxtApp().$toast.error( this.toast_error_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        } else {
            await axios
                .put(url, this.form)
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        
                        useNuxtApp().$toast.error( this.toast_error_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        }
        return data;
    }
    async axios_get() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            NUXT_PUBLIC_API_BASE,
            "/",
            this.version,
            "/",
            this.end_point
        );
        let params = qs.stringify(this.form, { arrayFormat: "comma" });
        if (params) {
            url = url.concat("?", params);
        }
        let data = false;
        if (this.using_auth) {
            await axios
                .get(url, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        useNuxtApp().$toast.error( this.toast_error_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        } else {
            await axios
                .get(url)
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        useNuxtApp().$toast.error( this.toast_error_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        }
        return data;
    }
    async axios_delete() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            NUXT_PUBLIC_API_BASE,
            "/",
            this.version,
            "/",
            this.end_point,
            "/"
        );
        let data = false;
        if (this.using_auth) {
            await axios
                .delete(url, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });

                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        useNuxtApp().$toast.error( err.response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        } else {
            await axios
                .delete(url)
                .then((response) => {
                    if (this.toast_success) {
                        useNuxtApp().$toast.success( this.toast_success_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        useNuxtApp().$toast.error( this.toast_error_message, {
                            rtl: true,
                            position: 'top-center',
                            theme:'dark'
                        });
                    }
                });
        }
        return data;
    }
}