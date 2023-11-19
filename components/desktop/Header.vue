<template>
    <header class="header header--desktop">
        <div class="header__menu">
            <div class="header__logo">
                <a href="/" class="align-center" title="Shavaz logo">
                    <img
                        src="~/assets/images/shavaz-logo.png"
                        class=""
                        alt="Shavaz Logo"
                        width="107"
                        height="38"
                        title="Shavaz Logo"
                    />
                </a>
            </div>
            <div class="header__search-box">
                <v-text-field
                    :loading="loading"
                    color="grey-lighten-3"
                    density="compact"
                    variant="solo"
                    label="جستجو   "
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    @click:append-inner="onClick"
                />
            </div>
            <div class="flex header__icon">
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/Group 820.png"
                        class=""
                        alt="Shavaz Logo"
                        width="40"
                        height="24"
                        title="Shavaz Logo"
                    />
                </a>
                <span class="icon-separator">|</span>

                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/iconamoon_heart-light.png"
                        class=""
                        alt="Shavaz Logo"
                        width="24"
                        height="24"
                        title="Shavaz Logo"
                    />
                </a>
                <span class="icon-separator">|</span>
                <a href="/" title="Shavaz logo">
                    <img
                        src="~/assets/images/v-icon.png"
                        class=""
                        alt="Shavaz Logo"
                        width="24"
                        height="24"
                        title="Shavaz Logo"
                    />
                </a>
            </div>
        </div>
        <div class="menu menu--desktop">
            <nav>
                <ul class="menu__items">
                    <li v-for="item in menus" :key="item.id">
                        <a>
                            <v-icon :icon="`mdi-${item.icon}`"/>
                            <span>{{ item.title }}</span>
                        </a>
                        <template v-if="item.name == 'categories'">
                            <div v-if="item.children && item.children.length" class="mega-menu">
                                <ul class="menu__items">
                                    <li v-for="child1 in item.children" :key="child1.id">
                                        <a>
                                            <div>
                                                <v-icon :icon="`mdi-${child1.icon}`" class="ml-1"/>
                                                <span>{{ child1.title }}</span>
                                            </div>
                                            <v-icon icon="mdi-chevron-left"/>
                                        </a>
                                        <div>
                                            <ul class="li-child1">
                                                <li  v-for="child2 in child1.children" :key="child2.id">
                                                    <a>
                                                        <span>{{ child2.title }}</span>
                                                    </a>
                                                    <ul>
                                                        <li class="li-child2" v-for="child3 in child2.children" :key="child3.id">
                                                            <a>
                                                                <span>{{ child3.title }}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    
                                                </li>
                                            </ul>
                                            <div class="image"/>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else></template>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- <div class="header__items">
            <span @click="toggleDropdown" class="header__dropdown">
                دسته‌بندی‌ها
            </span>

            <ul v-if="isDropdownVisible" class="dropdown-menu">
                <li v-for="category in categories" :key="category.text">
                    <span @click="onCategorySelected(category)">
                        {{ category.text }}
                    </span>
                    <ul
                        v-if="
                            selectedCategory === category &&
                            category.subcategories &&
                            category.subcategories.length
                        "
                    >
                        <li
                            v-for="subcategory in category.subcategories"
                            :key="subcategory.text"
                            @click="onSubcategorySelected(subcategory)"
                        >
                            {{ subcategory.text }}
                        </li>
                    </ul>
                </li>
            </ul>
            <a href="/" class="header__item">
                <v-icon>mdi-flash-outline</v-icon>
                <span>پرفروش‌ترین‌های هفته</span>
            </a>
            <a href="/" class="header__item">
                <v-icon>mdi-sale-outline </v-icon>
                <span>محصولات تخفیف‌دار</span>
            </a>
            <a href="/" class="header__item">
                <v-icon>mdi-ballot-outline</v-icon>
                <span>بلاگ</span>
            </a>
            <a href="/" class="header__item">
                <v-icon>mdi-storefront-outline</v-icon>
                <span>درباره ما</span>
            </a>
            <a href="/" class="header__item">
                <v-icon>mdi-phone-in-talk-outline</v-icon>
                <span>تماس با ما</span>
            </a> -->
            <!-- <div class="header__special-sale"></div>
        </div> --> 
    </header>
</template>
  
<script>
export default {
    name: "Header",
    data() {
        return {
            isDropdownVisible: false,
            selectedCategory: null,
            // categories: [
            //     {
            //         text: "لوازم آرایشی",
            //         subcategories: [
            //             { text: "پاک‌کننده آرایش" },
            //             { text: "آرایش چشم" },
            //             { text: "آرایش صورت" },
            //             { text: "آرایش ابرو" },
            //             { text: "آرایش لب" },
            //             { text: "ابزار آرایشی" },
            //         ],
            //     },
            //     {
            //         text: "آرایش و مراقبت مو",
            //         subcategories: [
            //             { text: "Subcategory س" },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: " مراقبت از پوست  ",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: "لوازم بهداشتی",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: "عطر، ادکلن و اسپری",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: "  بهداشت شخصی ",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: "  بهداشت و زیبایی ناخن ",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: " مراقبت از کودکان  ",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            //     {
            //         text: "بهداشت خانگی ",
            //         subcategories: [
            //             { text: "Subcategory " },
            //             { text: "Subcategory " },
            //         ],
            //     },
            // ],
            menus: [
                {      
                    id: '1efe',
                    icon: 'menu',
                    name:'categories',
                    title: ' دسته‌بندی‌ها ',
                    link: '/',
                    children:[{
                        id: '1',
                        icon: 'lipstick',
                        title: 'لوازم آرایشی',
                        link: '/',
                        children: [{
                                id: 'c131',
                                icon: null,
                                title: 'پاک کننده آرایش',
                                link: '/',
                                children: [{
                                        id: 'c281',
                                        icon: null,
                                        title: 'پد و پنبه آرایشی',
                                        link: '/',
                                    },
                                    {
                                        id: 'c722',
                                        icon: null,
                                        title: 'بورس صورت',
                                        link: '/',
                                    },
                                    {
                                        id: 'c293',
                                        icon: null,
                                        title: 'پاک‌کننده آرایش صورت',
                                        link: '/',
                                    }
                                ]
                            },
                            {
                                id: 'c172',
                                icon: null,
                                title: 'آرایش لب',
                                link: '/',
                                children: [{
                                        id: 'c721',
                                        icon: null,
                                        title: 'رژ لب',
                                        link: '',
                                    },
                                    {
                                        id: 'c292',
                                        icon: null,
                                        title: 'تینت لب',
                                        link: '/',
                                    }
                                ]
                            },
                            {
                                id: '17',
                                icon: null,
                                title: 'آرایش چشم',
                                link: '/',
                                children: []
                            },
                            {
                                id: '18',
                                icon: null,
                                title: 'آرایش صورت',
                                link: '/',
                                children: []
                            }
                        ]
                    },
                    {
                        id: '02',
                        icon: 'hair-dryer-outline',
                        title: 'آرایش و مراقبت مو',
                        link: '/',
                        children: null,
                        children: [{
                            id: 'c1d51',
                            icon: null,
                            title: 'آرایش مو',
                            link: '/',
                            children: [{
                                    id: 'c291',
                                    icon: null,
                                    title: 'چسب مو',
                                    link: '/',
                                },
                                {
                                    id: 'c262',
                                    icon: null,
                                    title: 'ماسک مو',
                                    link: '/',
                                },
                                {
                                    id: 'c233',
                                    icon: null,
                                    title: 'بی رنگ کننده مو',
                                    link: '/',
                                }
                            ]
                        }]
                    },
                    {
                        id: '52',
                        icon: 'hand-wash-outline',
                        title: 'لوازم بهداشتی',
                        link: '/',
                        children: null,
                        children: [{
                            id: 'c1d1',
                            icon: null,
                            title: 'زنانه',
                            link: '/',
                            children: [{
                                    id: 'c521',
                                    icon: null,
                                    title: 'شامپو مو',
                                    link: '/',
                                },
                                {
                                    id: 'c272',
                                    icon: null,
                                    title: 'شامپو بدن',
                                    link: '/',
                                },
                                {
                                    id: 'c253',
                                    icon: null,
                                    title: 'نخ دندان',
                                    link: '/',
                                }
                            ]
                        }]
                    }]
                },
                {
                    id: '1eefe',
                    icon: 'sale-outline',
                    name:'most seller',
                    title: 'پرفروش‌ترین‌های هفته',
                    link: '/',
                    children: null
                },
                {
                    id: '1eefe',
                    icon: 'ballot-outline',
                    name:'discount',
                    title: ' محصولات تخفیف‌دار',
                    link: '/',
                    children: null
                },
                {
                    id: '1eefe',
                    icon: 'menu',
                    name:'most seller',
                    title: ' بلاگ',
                    link: '/',
                    children: null
                },
                {
                    id: '1eefe',
                    icon: 'storefront-outline',
                    name:'most seller',
                    title: 'درباره ما ',
                    link: '/',
                    children: null
                },
                {
                    id: '1eefe',
                    icon: 'phone-in-talk-outline',
                    name:'most seller',
                    title: ' تماس با ما',
                    link: '/',
                    children: null
                },
                
            ]
        };
    },
    methods: {
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
            this.selectedCategory = null;
        },
        onCategorySelected(category) {
            this.selectedCategory =
                this.selectedCategory === category ? null : category;
        },
        onSubcategorySelected(subcategory) {
            console.log("Selected Subcategory:", subcategory.text);
        },
    },
};
</script>

<style scoped>
@import "~/assets/scss/components/desktop/general/header.scss";
</style>