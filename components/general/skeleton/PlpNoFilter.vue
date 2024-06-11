<template>
<v-row v-if="!hideText" justify="start">
    <v-col cols="4">
        <v-skeleton-loader :loading="loading" type="text" />
    </v-col>
</v-row>
<v-row justify="center">
    <v-col cols="12">
        <div class="v-product__contents pt-3">
            <div class="px-2">
                <v-row>
                    <v-col v-for="card in 12" :key="card" cols="12" lg="3">
                        <v-skeleton-loader :loading="loading" height="240" type="image, list-item-two-line">
                            <v-responsive>
                                <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                                <v-list-item subtitle="subtitle" title="title" class="px-0" />
                            </v-responsive>
                        </v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div class="v-product__pagination d-flex justify-center mt-8">
            <v-row justify="center">
                <v-col v-for="num in 6" :key="num" cols="1">
                    <v-skeleton-loader class="mx-auto" max-width="100" type="button" />
                </v-col>
            </v-row>
        </div>
    </v-col>
</v-row>
</template>

<script>
export default {
    props: {
        hideText:Boolean,

        loading: Boolean
    }
}
</script>
