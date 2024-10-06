<template>
  <section class="second-hero py-12">
    <v-row>
        <v-col class="d-flex align-center h100">
            <div>
              <h2 class="t20 w600 text-sGrayDarken2 l40 mb-2">این پاییز، تو شاواز بریز و بپاشه...!</h2>
              <p class="t20 w300 text-sGrayDarken2 l40">
                  هدیه داریم برای همه، هم برای امروز هم برای جمعه سیاه.
  فقط کافیه شمارت رو وارد کنی و با انتخاب یا وارد کردن آدرست،هدیه شاواز و رومینا به دستت برسه! راستی همراه هدیه‌ات یه کد تخفیف ۲۵ درصدی، بدون هیچ قید و شرطی می‌گیری.
  ممنونیم که همراه شاوازی.
              </p>
            </div>
        </v-col>
        <v-col class="d-flex justify-end pl-15 ">
            <div class="second-hero__image">
              <div class="second-hero__image__bag">
                <div class="bag">
                  <span></span>
                </div>
                <div class="sku1"></div>
                <div class="sku2"></div>
              </div>
            </div>
        </v-col>
    </v-row>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

.second-hero{
  &__image{
    height: 321px;
    width: 200px;

    &__bag{
      position: relative;
      height: 100%;

        .bag{
            position: relative;
            width: 157px;
            height: 147px;
            position: absolute;
            bottom: 0;
            right: 10px;

          span{
            width: 157px;
            height: 147px;
            background: url("@/assets/images/campaign/romina-bag.png") no-repeat;
            position: relative;
            z-index: 3;
            display: block;
          }

          &::before{
            content: '';
            width: 59px;
            height: 59px;
            background: url("@/assets/images/campaign/romina-star2.png") no-repeat;
            position: absolute;
            z-index: 1;
            bottom: 6px;
            right: -46px;
          }

          &::after{
            content: '';
            width: 157px;
            height: 157px;
            background: url("@/assets/images/campaign/romina-star1.png") no-repeat;
            position: absolute;
            z-index: 1;
            top: -96px;
            left: -87px;
          }
        }

        .sku1{
          width: 87px;
          height: 102px;
          background: url("@/assets/images/campaign/romina-sku2.png") no-repeat;
          position: absolute;
          bottom: 165px;
          right: 0;
          transition: transform 0.8s ease;
          z-index: 2;
        }

        .sku2{
          width: 112px;
          height: 114px;
          background: url("@/assets/images/campaign/romina-sku.png") no-repeat;
          position: absolute;
          bottom: 231px;
          left: 0;
          transition: transform 0.8s ease;
          z-index: 2;
        }

        &:hover{
          .sku2 {
              transform: translate(11px, 115px) rotate(19deg);
          }

          .sku1 {
              transform: translate(-11px, 64px) rotate(-16deg);
          }

        }
    }
  }
}

</style>