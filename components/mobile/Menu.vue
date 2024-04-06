<template>
<div
    v-if="menuList && menuList.length"
    class="menu menu--mobile"
    id="menu--mobile">
    <nav>
        <ul class="menu__items">
            <template v-if="menuList[0] && menuList[0].children && menuList[0].children.length">
                <li
                    class="menu__item"
                    v-for="(item, index) in menuList[0].children"
                    :key="item.id"
                    @click="openSubMenu(item.id)"
                    :id="`menu__item--${item.id}`"
                    :class="{'has-child' : item.children ,'active-menu' : index === 0 }">
                    <a class="menu__item__link">
                        <v-icon :icon="`mdi-${item.icon}`" />
                        <span>{{item.label}}</span>
                    </a>

                    <ul
                        v-if="item.children && item.children.length"
                        class="menu__items"
                        :class="{'show-mega-menu' : index === 0 }"
                        :id="`menu__items--${item.id}`">
                        <li
                            v-for="child1 in item.children"
                            :key="child1.id"
                            class="menu__item"
                            :class="child1.children ? 'has-child' :''"
                            :id="`menu__item--${child1.id}`"
                            @click="openSubMenu2(child1.id)">
                            <a class="menu__item__link d-flex align-center justify-space-between">
                                <span class="t13">{{child1.label}}</span>
                                <v-icon v-if="child1.children && child1.children.length" icon="mdi-chevron-down" />
                            </a>

                            <ul
                                v-if="child1.children && child1.children.length"
                                class="menu__items"
                                :id="`menu__items--${child1.id}`">
                                <li
                                    v-for="child2 in child1.children"
                                    :key="child2.id"
                                    class="menu__item">
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
    </nav>
</div>
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
