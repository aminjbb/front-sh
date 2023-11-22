<template lang="">
<div class="c-menu">
    <v-container class="pb-0">
        <nav class="menu menu--desktop">
            <ul class="menu__items">
                <li
                    class="menu__item"
                    v-for="(menu, index) in menus"
                    :key="menu.id"
                    @mouseenter="showBodyCover(index)"
                    @mouseleave="hideBodyCover"
                    :class="{'has-child' : menu.children, 'has-mega-menu': index === 0}">
                    <a class="menu__item__link">
                        <v-icon :icon="`mdi-${menu.icon}`" />
                        <span>{{menu.title}}</span>
                    </a>
                    <template v-if="menu.name == 'categories'">
                        <div v-if="menu.children && menu.children.length" class="mega-menu">
                            <v-container>
                                <ul class="menu__items">
                                    <li v-for="child1 in menu.children" :key="child1.id">
                                        <a>
                                            <div>
                                                <v-icon :icon="`mdi-${child1.icon}`" class="ml-1" />
                                                <span>{{ child1.title }}</span>
                                            </div>
                                            <v-icon icon="mdi-chevron-left" />
                                        </a>
                                        <div class="menu__items__image-child">
                                            <div class="menu__items__image-ul">
                                                <ul class="menu__items">
                                                    <div>
                                                        <template v-for="child2 in child1.children">
                                                            <li
                                                                v-if="child2.priority === '1'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu-items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </template>
                                                    </div>
                                                    <div>
                                                        <template v-for="child2 in child1.children">
                                                            <li
                                                                v-if="child2.priority === '2'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu-items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>

                                                            <li
                                                                v-if="child2.priority === '3'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </template>
                                                    </div>
                                                    <div>
                                                        <template v-for="child2 in child1.children">
                                                            <li
                                                                v-if="child2.priority === '4'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </template>
                                                    </div>
                                                    <div>
                                                        <template v-for="child2 in child1.children">
                                                            <li
                                                                v-if="child2.priority === '5'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>

                                                            <li
                                                                v-if="child2.priority === '6'"
                                                                :key="child2.id"
                                                                class="menu__item">
                                                                <span>{{ child2.title }}</span>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child3 in child2.children"
                                                                        :key="child3.id">
                                                                        <a>
                                                                            <span>{{ child3.title }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </template>
                                                    </div>
                                                </ul>
                                            </div>
                                            <div class="menu__items__image">image</div>
                                        </div>
                                    </li>
                                </ul>
                            </v-container>
                        </div>
                    </template>
                </li>
            </ul>
        </nav>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            menus: [{
                    id: '1efe',
                    icon: 'menu',
                    name: 'categories',
                    title: ' دسته‌بندی‌ها ',
                    link: '/',
                    children: [{
                            id: '1',
                            icon: 'lipstick',
                            title: 'لوازم آرایشی',
                            link: '/',
                            children: [{
                                    id: 'c131',
                                    icon: null,
                                    title: 'پاک کننده آرایش',
                                    priority: '1',
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
                                    priority: '2',
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
                                    priority: '3',
                                    link: '/',
                                    children: []
                                },
                                {
                                    id: '18',
                                    icon: null,
                                    title: 'آرایش صورت',
                                    priority: '4',
                                    link: '/',
                                    children: []
                                },
                                {
                                    id: '18',
                                    icon: null,
                                    title: 'آرایش ابرو',
                                    priority: '5',
                                    link: '/',
                                    children: []
                                },
                                {
                                    id: '18',
                                    icon: null,
                                    title: 'ابزار آرایشی',
                                    priority: '6',
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
                        }
                    ]
                },
                {
                    id: '1eefe',
                    icon: 'sale-outline',
                    name: 'most seller',
                    title: 'پرفروش‌ترین‌های هفته',
                    link: '/',
                },
                {
                    id: '1eefe',
                    icon: 'ballot-outline',
                    name: 'discount',
                    title: ' محصولات تخفیف‌دار',
                    link: '/',
                },
                {
                    id: '1eefe',
                    icon: 'menu',
                    name: 'most seller',
                    title: ' بلاگ',
                    link: '/',
                },
                {
                    id: '1eefe',
                    icon: 'storefront-outline',
                    name: 'most seller',
                    title: 'درباره ما ',
                    link: '/',
                    children: null
                },
                {
                    id: '1eefe',
                    icon: 'phone-in-talk-outline',
                    name: 'most seller',
                    title: ' تماس با ما',
                    link: '/',
                    children: null
                },

            ]
        }
    },

    methods: {
        showBodyCover(index) {
            if (index === 0) {
                document.getElementById('header--desktop').classList.add('show-mega-menu')
                document.body.classList.add('active');
            }
        },

        hideBodyCover() {
            document.getElementById('header--desktop').classList.remove('show-mega-menu')
            document.body.classList.remove('active');
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
$parent: 'menu';

.c-menu {
    position: relative;
}

.#{$parent} {
    &--desktop {

        >ul.menu__items {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0 !important;
            padding: 0 !important;

            li {
                list-style: none !important;
            }

            >li {
                margin-left: 50px;
                padding: 14px 0;
                cursor: pointer;

                @include gbp(768, 1280) {
                    margin-left: 10px;
                }

                >a.menu__item__link {
                    .v-icon {
                        color: #616161;
                        font-size: 21px;
                        margin-left: 6px;
                    }

                    span {
                        color: #616161;
                        font-size: 13px;
                    }
                }

                &:hover {
                    >a.menu__item__link {

                        span,
                        .v-icon {
                            color: #D72685 !important;
                        }
                    }
                }

                &:not(.has-mega-menu) {
                    position: relative;
                }

                &.has-mega-menu:hover .mega-menu {
                    display: block;
                    z-index: 1000;
                }

                .mega-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 100vw;
                    z-index: 10;
                    display: none;

                    .v-container {
                        padding: 0 !important;

                        >ul {
                            display: flex;
                            flex-direction: column;
                            background-color: #fff;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            width: 100%;
                            min-height: 420px;
                            position: relative;
                            margin: 0 !important;
                            border-radius: 0px 0px 8px 8px;
                            overflow: hidden;
                            height: 100%;

                            &::before {
                                width: 220px;
                                height: 100%;
                                content: '';
                                position: absolute;
                                top: 0;
                                right: 0;
                                background: var(--shade-background-color, #F7F8FA);

                                @include gbp(768, 1280) {
                                    width: 180px;
                                }
                            }

                            >li {
                                width: 220px;
                                padding: 13px 16px;
                                z-index: 1;
                                cursor: pointer;

                                @include gbp(768, 1280) {
                                    width: 180px;
                                    padding: 13px 5px;
                                }

                                >a {
                                    width: 100%;
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;

                                    span {
                                        font-size: 13px;
                                        color: #757575;
                                    }

                                    .v-icon {
                                        font-size: 18px;
                                        color: #757575;
                                    }

                                    >div {
                                        .v-icon {
                                            margin-left: 6px;
                                            font-size: 20px !important;
                                        }
                                    }
                                }

                                &:hover {
                                    background-color: #FCE4EC;

                                    span,
                                    .v-icon {
                                        color: #811750;
                                    }

                                    >div.menu__items__image-child {
                                        display: flex;
                                    }
                                }

                                >div.menu__items__image-child {
                                    display: none;
                                    padding: 0;
                                    width: calc(100% - 220px);
                                    right: 220px;
                                    top: 0;
                                    height: 100%;
                                    position: absolute;

                                    @include gbp(768, 1280) {
                                        width: calc(100% - 180px);
                                        right: 180px;
                                    }

                                    .menu__items__image {
                                        width: 184px;
                                        flex: 0 0 184px;
                                        padding: 16px;

                                        img {
                                            width: 100%;
                                            border-radius: 6px;
                                            max-height: 100%;
                                        }
                                    }

                                    .menu__items__image-ul {
                                        width: calc(100% - 184px);
                                        flex: 0 0 calc(100% - 184px);
                                        height: 100%;
                                        overflow-y: auto;
                                        direction: ltr !important;
                                        padding: 16px;

                                        &::-webkit-scrollbar {
                                            width: 3px;
                                        }

                                        &::-webkit-scrollbar-track {
                                            border-radius: 2px;
                                            background-color: #F8BBD0;
                                        }

                                        &::-webkit-scrollbar-thumb {
                                            border-radius: 2px;
                                            background-color: #F06292;
                                        }

                                        >ul {
                                            grid-template-columns: repeat(4, minmax(0, 1fr));
                                            display: grid;

                                            >div {
                                                >li.menu__item {
                                                    margin-bottom: 11px;

                                                    >span {
                                                        font-size: 14px;
                                                        font-weight: 400;
                                                        color: #424242;
                                                        display: block;
                                                        padding: 8px 0px 12px;
                                                    }

                                                    li.menu__item {
                                                        padding: 4px 0;

                                                        >a {
                                                            >span {
                                                                font-size: 13px;
                                                                font-weight: 400;
                                                                color: #9E9E9E;
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
