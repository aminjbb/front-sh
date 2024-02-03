<template>
<div class="loading_modal">
    <v-progress-circular indeterminate color="purple"></v-progress-circular>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading_modal {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #0000004a;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
