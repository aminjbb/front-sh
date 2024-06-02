<template>
    <header class="game-header">
        <a href="/" title="Shavaz logo">
            <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="107" height="36" title="Shavaz Logo" />
        </a>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .game-header{
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top:5px ;

        a {
            height: 36px;
            display: inline-block;
        }
    }
</style>