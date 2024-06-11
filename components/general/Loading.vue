<template>
<div class="d-flex align-center justify-center my-10 w-100">
    <v-progress-circular :color="color" indeterminate></v-progress-circular>
</div>
</template>

<script>
export default {
    props:{
        color:{
            type: String,
            default:'primary'
        }
    }
}
</script>
