<template>
  <div style="width: 100%; height: 100vh" class="d-flex justify-center align-center welcome-back">
    <p class="text-white glossy-font" style="font-size: 200px; font-weight: 800" v-if="!isText">{{ count }}</p>
    <p class="text-white lalezar-regular" style="font-size: 100px; font-weight: 800" v-else>یک زندگی جدید تو راهه ...</p>
<!--    <img width="400" src="@/assets/images/Animation.gif" alt="">-->
  </div>
</template>
<script>
export default {
  data(){
    return{
      count:5,
      interval:null,
      isText:false
    }
  },

  mounted() {

    this.interval = setInterval(()=>{
      if (this.count > 0) --this.count
      else{
        clearInterval(this.interval)
        this.isText = true
        setTimeout(()=>{
          this.$router.push('/')
        },2500 )

      }


    } , 1000)
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lalezar&display=swap');
.welcome-back{
  background: #d72685;
  background-image: url("@/assets/images/welcomeBack.png");
  background-repeat: repeat;
}

.glossy-font{

  font-family:GlossySheenFont !important
}

.lalezar-regular {
  font-family: "Lalezar", system-ui !important;
  font-weight: 400 !important;
  font-style: normal;
}
</style>