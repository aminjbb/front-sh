import {
  createStore
} from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      loadingModal: false,
      userData: {
        first_name: null,
        last_name: null,
        phone_number: null,
      },
      basket:[],
      orderAddress:null,
      orderPayMethod:null,
      orderSendingMethod:null,
    };
  },

  mutations: {
    set_orderSendingMethod(state , value){
      state.orderSendingMethod = value
    },
    set_orderPayMethod(state , value){
      state.orderPayMethod = value
    },
    set_orderAddress(state , id){
      state.orderAddress = id
    },
    set_basket(state , obj){
      state.basket = obj
    },
    set_loadingModal(state, bool) {
      state.loadingModal = bool
    },

    increment(state) {
      state.count++;
    },

    set_userData(state, user) {
      state.userData.first_name = user.first_name,
      state.userData.last_name = user.last_name,
      state.userData.phone_number = user.phone_number
    }
  },

  getters: {
    get_orderSendingMethod(state){
      return  state.orderSendingMethod
    },
    get_orderPayMethod(state){
      return   state.orderPayMethod
    },
    get_orderAddress(state){
      return  state.orderAddress
    },
    get_basket(state ){
      return  state.basket
    },
    get_loadingModal(state) {
      return state.loadingModal
    },

    get_userData(state) {
      return state.userData
    },
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});