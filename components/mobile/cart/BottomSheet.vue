<template>
<div class="text-center">
    <v-bottom-sheet v-model="sheet" height="400px">
        <v-card class="text-center">
            <v-card-text>
                <generalAuth @logined="logined"/>
            </v-card-text>
        </v-card>
    </v-bottom-sheet>
</div>
</template>

  
<script>
export default {
    data: () => ({
        sheet: false,
    }),

    methods:{
        logined(event){
            if(event === true){
                this.sheet = false;
                window.location = '/cart'
            }
        }
    }
}
</script>
