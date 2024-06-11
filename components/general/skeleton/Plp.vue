<template>
<v-row v-if="screenSize === 'desktop'">
    <v-col cols="12">
        <v-row justify="start">
            <v-col cols="1">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col cols="2">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-5" rounded="lg">
                    <v-row>
                        <v-col v-for="pro in 6" :key="pro" cols="2">
                            <v-skeleton-loader :loading="loading" height="240" type="image, list-item">
                                <v-responsive>
                                    <v-img src="src" class="rounded-lg mb-2" height="184" cover />

                                    <v-list-item subtitle="subtitle" title="title" class="px-0" />
                                </v-responsive>
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>
<v-row v-if="screenSize === 'mobile'">
    <v-col cols="12">
        <v-row justify="start">
            <v-col cols="5">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-5" rounded="lg">
                    <v-row justify="center">
                        <v-col v-for="pro in 3" :key="pro" cols="4">
                            <v-skeleton-loader :loading="loading" height="240" type="image, list-item">
                                <v-responsive>
                                    <v-img src="src" class="rounded-lg mb-2" height="184" cover />

                                    <v-list-item subtitle="subtitle" title="title" class="px-0" />
                                </v-responsive>
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>

<v-row class="mt-10">
    <v-col cols="12" md="3" v-if="screenSize === 'desktop'">
        <div class="filter-sidebar">
            <v-row justify="space-between">
                <v-col class="mb-2" cols="6">
                    <v-skeleton-loader :loading="loading" type="text">
                    </v-skeleton-loader>
                </v-col>
                <v-col class="mb-2" cols="6">
                    <v-skeleton-loader :loading="loading" type="text">
                    </v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row justify="start">
                <v-col v-for="sidBarItem in 12" :key="sidBarItem" cols="12">
                    <v-skeleton-loader :loading="loading" type="text">
                    </v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
    </v-col>

    <v-row justify="space-between" v-if="screenSize === 'mobile'">
        <v-col cols="6">
            <v-skeleton-loader v-if="loading" type="text" />
        </v-col>
        <v-col cols="6">
            <v-skeleton-loader v-if="loading" type="text" />
        </v-col>
    </v-row>

    <v-col cols="12" md="9">
        <template v-if="screenSize === 'desktop'">
            <v-row justify="start">
                <v-col cols="1" v-for="cat in 5" :key="cat">
                    <v-skeleton-loader v-if="loading" type="text" />
                </v-col>
            </v-row>
        </template>

        <div class="v-product__contents" :class="screenSize === 'desktop' ? 'mt-6' : ''">
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
        screenSize: {
            type: String,
            default: 'desktop'
        },

        loading: Boolean
    }
}
</script>
