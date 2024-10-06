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
        wallet_mount: null,
      },
      basket:[],
      orderAddress:null,
      orderPayMethod:null,
      orderSendingMethod:null,
      orderErrorModal:{
        dialog:false,
        buttonType:'',
        title:'',
        text:'',
        object:[],
        submitText:'',
        type:null,
        emptyBasket:''
      },
      homePageFirstTimeModal:null,
      country:null,
    };
  },

  mutations: {
    set_country(state , country){
      state.country = country
    },
    set_homePageFirstTimeModal(state , obj){
      state.homePageFirstTimeModal = obj
    },
    set_orderModalError(state, obj){
      state.orderErrorModal.buttonType = obj.buttonType
      state.orderErrorModal.text = obj.text
      state.orderErrorModal.dialog = obj.dialog
      state.orderErrorModal.submitText = obj.submitText
      state.orderErrorModal.title = obj.title
      state.orderErrorModal.object = obj.object
      state.orderErrorModal.type = obj.type
      state.orderErrorModal.emptyBasket = obj.emptyBasket
    },
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
      state.userData.wallet_mount= user?.wallet?.value
      state.userData.id= user?.id
    }
  },

  getters: {
    get_country(state){
      return  state.country
    },
    get_homePageFirstTimeModal(state){
      return  state.homePageFirstTimeModal
    },
    get_orderModalError(state){
      return state.orderErrorModal
    },
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