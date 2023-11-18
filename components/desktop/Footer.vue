<template lang="">
    <footer class="footer footer--desktop">
        <nav class="footer__menu">
            
            <div class="footer__logo">
                
                <a href="/"  title="Shavaz logo">
                    <img
                        src="~/assets/images/shavaz-logo.png"
                        class=""
                        alt="Shavaz Logo"
                        width="107"
                        height="38" 
                        title="Shavaz Logo"
                    />
                </a>
                <button >
                    <span> 
                    بازگشت به بالا
                    </span>
                        <v-icon>mdi-arrow-up-thin</v-icon>
                    
                        
                </button>
            </div>
            <div class="footer__content">
                <div class="footer__links">
                    <ul> دسترسی سریع
                        <li>لوازم آرایشی</li>
                        <li>مراقبت از پوست</li>
                        <li>بهداشت خانگی</li>
                        <li>مراقبت از کودکان</li>
                        <li>لوازم بهداشتی</li>
                    </ul>
                    <ul> درباره شاواز
                        <li>درباره ما</li>
                        <li>سوالات متدال</li>
                        <li>فرصت‌های شغلی</li>
                        <li>فروشنده شوید</li>
                        
                    </ul>
                    <ul> راهنمای خرید
                        <li>نحوه ثبت سفارش</li>
                        <li>روش‌های پرداخت</li>
                        <li>شیوه‌های ارسال</li>
                        <li>شرایط مرجوعی</li>
                    </ul>
                </div>
                <div class="logos_email">
                    <h3>با ما در ارتباط باشید</h3>
                    <div>
                        <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/entypo-social_instagram-with-circle.png"
                        class=""
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="instagram"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/entypo-social_youtube-with-circle.png"
                        class=""
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="youtube"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/bi_telegram.png"
                        class=""
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="telegram"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/formkit_twitter.png"
                        class=""
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="twitter"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/entypo-social_linkedin-with-circle.png"
                        class=""
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="linkdin"
                    />
                </a>
                   
                   

                    </div>
                </div>
            </div>
        </nav>
    </footer>
    </template>
    
    <script>
export default {
    methods: {
        /**
         * Open category menu
         */
        openCategoryMenu() {
            const menu = document.getElementById("menu--mobile");
            menu.classList.toggle("open-menu");
        },
    },
};
</script>
    
    <style scoped>
@import "~/assets/scss/components/desktop/general/footer.scss";
</style>
    