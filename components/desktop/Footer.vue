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
                    <div >
                        <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/entypo-social_instagram-with-circle.png"
                        class="ml-3"
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="instagram"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/entypo-social_youtube-with-circle.png"
                        class="ml-3"
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="youtube"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/bi_telegram.png"
                        class="ml-3"
                        alt="Shavaz Logo"
                        width="28"
                        height="28"
                        title="telegram"
                    />
                </a>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/formkit_twitter.png"
                        class="ml-3"
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
                    <div >
                        <p>برای اطلاع از آخرین تخفیف‌ها، ایمیل خود را ثبت نمایید.</p>
                        <div class="email-envelop">
                        <input type="email" class="email-box" placeholder="ثبت ایمیل" />
                        
                            <button type="submit">
                          
                          <img
                              src="~/assets/images/ic_outline-email.png"
                              alt="Shavaz Logo"
                              width="28"
                              height="28"
                              title="envelop"
                              class="envelop"
                          />
                     
                              </button>
                        </div>
                        </div>
                </div>
                
            </div>
            <div class="footer__hologram">
                <div class="hologram-text">
                    <v-icon>mdi-phone-in-talk-outline</v-icon>
                    <span>  پشتیبانی شاواز:۰۲۱-۹۱۰۳۲۳۴۳ </span>
                    <span class="icon-separator">|</span>
                    <span>۲۴ ساعته در ۷ روز هفته پاسخگوی شما هستیم.</span>
                    
                    
                </div>
                <div class="logo-hologram">
                        <div class="logo-hologram">
                            <a href="/" title="Shavaz logo">
                                <img
                                src="~/assets/images/snapppay-png1402-03-27 1 (1).png"
                                class=""
                                alt="Shavaz Logo"
                                width="52"
                                height="61"
                                title="linkdin"
                                />
                            </a>
                            <a href="/" title="Shavaz logo">
                                <img
                                src="~/assets/images/1d2ab0.png"
                                class=""
                                alt="Shavaz Logo"
                                width="52"
                                height="61"
                                title="linkdin"
                                />
                            </a>
                            <a href="/" title="Shavaz logo">
                                <img
                                src="~/assets/images/logonama (1).png"
                                class="frame-hologram"
                                alt="Shavaz Logo"
                                width="52"
                                height="61"
                                title="linkdin"
                                />
                            </a>
                            <a href="/" title="Shavaz logo">
                                <img
                                src="~/assets/images/samandehi.png"
                                class=""
                                alt="Shavaz Logo"
                                width="52"
                                height="61"
                                title="linkdin"
                                />
                            </a>
                            
                           
                            
                          
                    </div>
                    </div>
                   
                
            </div>
            <div class="footer__text">
                                <p>استفاده از مطالب فروشگاه شاواز فقط برای مقاصد غیرتجاری و باذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس می باشد.</p>
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
    