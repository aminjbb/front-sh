<template>
<client-only>
    <div v-if="menuList && menuList.length" class="menu menu--mobile" id="menu--mobile">
        <nav>
            <div>
                <div class="menu__name">
                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z" stroke="#3C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="t17 w700">دسته‌بندی</span>
                </div>

                <ul class="menu__items">
                    <template v-if="menuList[0] && menuList[0].children && menuList[0].children.length">
                        <li class="menu__item" v-for="(item, index) in menuList[0].children" :key="item.id" @click="openSubMenu(item.id)" :id="`menu__item--${item.id}`" :class="{'has-child' : item.children ,'active-menu' : index === 0 }">
                            <div class="menu__item__info">
                                <a class="menu__item__link position-relative">
                                    <v-icon :icon="`mdi-${item.icon}`" class="ml-1" />
                                    <span>{{item.label}}</span>
                                    <v-icon class="down-icon" v-if="item.children && item.children.length" icon="mdi-chevron-down" size="small" />
                                </a>

                                <div class="child-preview">
                                    <span v-for="(child1, index) in item.children.slice(0,5)" :key="child1.id" class="t10 w400 text-grey ">
                                        <v-icon v-if="index !== 0" icon="mdi-circle" class="t10 text-primary sp d-inline-block mx-1" color="primary"></v-icon>
                                        {{ child1.label }} 
                                    </span>
                                </div>
                            </div>

                            <ul v-if="item.children && item.children.length" class="menu__items" :class="{'show-mega-menu' : index === 0 }" :id="`menu__items--${item.id}`">
                                <li v-for="child1 in item.children" :key="child1.id" class="menu__item" :class="child1.children ? 'has-child' :''" :id="`menu__item--${child1.id}`" @click="child1.children && child1.children.length ? openSubMenu2(child1.id) : ''">
                                    <a v-if="child1.children && child1.children.length" class="menu__item__link d-flex align-center justify-space-between">
                                        <span class="t13">{{child1.label}}</span>
                                        <v-icon v-if="child1.children && child1.children.length" icon="mdi-chevron-left" size="small" />
                                    </a>

                                    <a v-else class="menu__item__link d-flex align-center justify-space-between" :href="child1.url">
                                        <span class="t13">{{child1.label}}</span>
                                        <v-icon v-if="child1.children && child1.children.length" icon="mdi-chevron-left" size="small" />
                                    </a>

                                    <ul v-if="child1.children && child1.children.length" class="menu__items" :id="`menu__items--${child1.id}`">
                                        <li v-for="child2 in child1.children" :key="child2.id" class="menu__item">
                                            <a :href="child2.url" class="menu__item__link">
                                                <span class="t13 w500">{{child2.label}}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </div>
</client-only>
</template>

<script>
import Menu from '~/composables/Menu';
export default {
    data() {
        return {
            categoriesMenu: []
        }
    },

    setup() {
        const {
            getMenuList,
            menuList,
            loading
        } = Menu();
        return {
            getMenuList,
            menuList,
            loading
        };
    },

    mounted() {
        /**
         * Call getHomeSections in setup 
         */
        this.getMenuList();
    },

    methods: {
        getCategoriesMenu() {
            if (this.menuList && this.menuList.length > 0) {
                this.menuList.forEach(element => {
                    if (element.name == 'categories') {
                        this.categoriesMenu.push(this.element)
                    }
                });
                return this.categoriesMenu;
            }
        },
        /**
         * Open first sub menu
         */
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

        /**
         * Open second sub menu
         */
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
