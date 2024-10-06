<template>
  <header class="romina-campaign__header d-flex align-center bg-white">
    <a href="/" class="header__logo" title="Shavaz logo">
        <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="107" height="38" title="Shavaz Logo" />
    </a>
  </header>

</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import "~/assets/scss/tools/bp";

.romina-campaign{
    &__header{
        background: white;
        height: 96px;
        padding: 0 36px;

        @include gbp(0, 769) {
          height: 60px;
          padding: 0 16px;
        }

        align-self: {
          display: flex;
        };

        img{
          @include gbp(0, 769) {
            height: 28px;
          }
        }
    }
}

</style>