<template>
<div class="c-menu">
    <v-container class="pb-0">
        <nav class="menu menu--desktop d-flex justify-space-between align-center">
            <ul class="menu__items flex-grow-1 ml-3">
                <li
                    class="menu__item"
                    v-for="(menu, index) in menuList"
                    :key="menu.id"
                    @mouseenter="showBodyCover(index)"
                    @mouseleave="hideBodyCover"
                    :class="{'has-child' : menu.children, 'has-mega-menu': index === 0}">
                    <template v-if="menu.name !== 'promotion'">
                        <a :href="menu.name !== 'categories' ? menu.url : ''" class="menu__item__link">
                            <v-icon :icon="`mdi-${menu.icon}`" />
                            <span>{{menu.label}}</span>
                        </a>

                        <template v-if="menu.name == 'categories'">
                            <div
                                v-if="menu.children && menu.children.length"
                                class="mega-menu"
                                id="mega-menu">
                                <v-container>
                                    <ul class="menu__items" @mouseleave="hideBodyCover">
                                        <li v-for="(child1, index) in menu.children" :key="child1.id" :class="index === 0 ? {'firstOpen' : firstOpen} : ''" @mouseenter="removeFirstOpen">
                                            <a :href="child1.url">
                                                <div>
                                                    <v-icon :icon="`mdi-${child1.icon}`" class="ml-1" />
                                                    <span>{{ child1.label }}</span>
                                                </div>
                                                <v-icon icon="mdi-chevron-left" />
                                            </a>

                                            <div class="menu__items__image-child">
                                                <div class="menu__items__image-ul">
                                                    <ul class="menu__items">
                                                        <div>
                                                            <li v-if="child1.children&& child1.children[0]" class="menu__item">
                                                                <a :href="child1.children[0].url">
                                                                    <span>{{ child1.children[0].label }}</span>
                                                                </a>

                                                                <ul class="menu-items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[0].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                        <div>
                                                            <li v-if="child1.children && child1.children[1]" class="menu__item">
                                                                <a :href="child1.children[1].url">
                                                                    <span>{{ child1.children[1].label }}</span>
                                                                </a>
                                                                <ul class="menu-items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[1].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>

                                                            <li v-if="child1.children && child1.children[2]" class="menu__item">
                                                                <a :href="child1.children[2].url">
                                                                    <span>{{ child1.children[2].label }}</span>
                                                                </a>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[2].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                        <div>
                                                            <li v-if="child1.children[3]" class="menu__item">
                                                                <a :href="child1.children[3].url">
                                                                    <span>{{ child1.children[3].label }}</span>
                                                                </a>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[3].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                        <div>
                                                            <li v-if="child1.children[4]" class="menu__item">
                                                                <a :href="child1.children[4].url">
                                                                    <span>{{ child1.children[4].label }}</span>
                                                                </a>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[4].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>

                                                            <li v-if="child1.children[5]" class="menu__item">
                                                                <a :href="child1.children[5].url">
                                                                    <span>{{ child1.children[5].label }}</span>
                                                                </a>
                                                                <ul class="menu__items">
                                                                    <li
                                                                        class="menu__item"
                                                                        v-for="child2 in child1.children[5].children"
                                                                        :key="child2.id">
                                                                        <a :href="child2.url">
                                                                            <span>{{ child2.label }}</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>

                                                <div class="menu__items__image">
                                                    <img v-if="child1?.image_url && child1?.image_url !== null" :src="child1.image_url" :title="child1.label" :alt="child1.label" width="184" height="388" />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </v-container>
                            </div>
                        </template>
                    </template>
                </li>
            </ul>

            <a v-if="getPromotionLink" class="d-flex align-center" :href="getPromotionLink.url">
                <v-icon
                    icon="mdi-fire"
                    color="primary"
                    class="ml-2" />
                <span class="t14 w500 text-primary">فروش ویژه</span>
            </a>
        </nav>
    </v-container>
</div>
</template>

<script>
import Menu from '~/composables/Menu';
export default {
    data() {
        return {
            firstOpen: false
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

    computed:{
        getPromotionLink(){
            const link = this.menuList.find(item => item.name ==='promotion')
            return link
        }
    },

    mounted() {
        /**
         * Call getHomeSections in setup 
         */
        this.getMenuList();
    },

    methods: {
        showBodyCover(index) {
            if (index === 0) {
                document.getElementById('header--desktop').classList.add('show-mega-menu');
                document.getElementById('mega-menu').style.display = "block";
                document.getElementById('mega-menu').style.zIndex = "1000";
                document.body.classList.add('active');
                this.firstOpen = true;
            }
        },

        hideBodyCover() {
            document.getElementById('header--desktop').classList.remove('show-mega-menu');
            document.getElementById('mega-menu').style.display = "none";
            document.getElementById('mega-menu').style.zIndex = "10";
            document.body.classList.remove('active');
        },

        removeFirstOpen(){
            this.firstOpen = false;
        },
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

                @include gbp(992, 1280) {
                    margin-left: 25px;
                }

                @include gbp(769, 992) {
                    margin-left: 2px;
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

                .mega-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 100vw;
                    z-index: 10;
                    display: none;

                    a {
                        text-decoration: none;
                    }

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

                                @include gbp(769, 1280) {
                                    width: 180px;
                                }
                            }

                            >li {
                                width: 220px;
                                padding: 13px 16px;
                                z-index: 1;
                                cursor: pointer;

                                @include gbp(769, 1280) {
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

                                    >span,
                                    >.v-icon {
                                        color: #811750;
                                    }

                                    >div.menu__items__image-child {
                                        display: flex;
                                    }
                                }

                                &.firstOpen{
                                    background-color: #FCE4EC;

                                    >span,
                                    >.v-icon {
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

                                    @include gbp(769, 1280) {
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

                                                    >a {
                                                        font-size: 14px;
                                                        font-weight: 400;
                                                        color: #424242;
                                                        display: block;
                                                        padding: 8px 0px 12px;

                                                        &:hover {
                                                            color: #811750;
                                                        }
                                                    }

                                                    li.menu__item {
                                                        padding: 4px 0;

                                                        >a {
                                                            >span {
                                                                font-size: 13px;
                                                                font-weight: 400;
                                                                color: #9E9E9E;
                                                            }

                                                            &:hover {
                                                                >span {
                                                                    color: #AC1E6A
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
}
</style>
