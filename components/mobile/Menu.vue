<template lang="">
<div class="menu menu--mobile" id="menu--mobile">
    <nav>
        <ul class="menu__items">
            <li
                class="menu__item"
                v-for="item in menus"
                :key="item.id"
                @click="openSubMenu(item.id)"
                :id="`menu__item--${item.id}`"
                :class="item.children ? 'has-child' :''">
                <a class="menu__item__link">
                    <v-icon :icon="`mdi-${item.icon}`" />
                    <span>{{item.title}}</span>
                </a>

                <ul
                    v-if="item.children && item.children.length"
                    class="menu__items"
                    :id="`menu__items--${item.id}`">
                    <li
                        v-for="child1 in item.children"
                        :key="child1.id"
                        class="menu__item"
                        :class="child1.children ? 'has-child' :''"
                        :id="`menu__item--${child1.id}`"
                        @click="openSubMenu2(child1.id)">
                        <a class="menu__item__link d-flex align-items justify-space-between">
                            <span class="t13">{{child1.title}}</span>
                            <v-icon v-if="child1.children && child1.children.length" icon="mdi-chevron-down"/>
                        </a>

                        <ul
                            v-if="child1.children && child1.children.length"
                            class="menu__items"
                            :id="`menu__items--${child1.id}`">
                            <li
                                v-for="child2 in child1.children"
                                :key="child2.id"
                                class="menu__item">
                                <a class="menu__item__link">
                                    <span class="t13 w500">{{child2.title}}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            menus: [{
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
                }
            ]
        }
    },

    methods: {
        openSubMenu(id) {
            const menu = document.querySelector('.menu');
            const ulItems = menu.querySelectorAll('ul');
            const liItems = menu.querySelectorAll('li');
            
            ulItems.forEach(item => {
                item.classList.remove('show-mega-menu');
            });

            liItems.forEach(item => {
                item.classList.remove('active-menu');
            });

            document.getElementById(`menu__items--${id}`).classList.toggle('show-mega-menu');
            document.getElementById(`menu__item--${id}`).classList.toggle('active-menu');
        },

        openSubMenu2(id) {
            const selectedLi = document.getElementById(`menu__item--${id}`);
            selectedLi.classList.toggle('active-sub-menu');

            document.getElementById(`menu__items--${id}`).classList.toggle('show-sub-menu');
        }
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/general/menu.scss';
</style>
