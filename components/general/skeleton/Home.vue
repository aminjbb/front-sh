<template>
<!--  desktop size -->
<div v-if="screenSize === 'desktop'">
    <v-row justify="center">
        <v-col cols="12" lg="4" md="6">
            <v-skeleton-loader :loading="loading" height="240" type="image">
                <v-responsive>
                    <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                </v-responsive>
            </v-skeleton-loader>
        </v-col>
    </v-row>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="px-5 py-3" rounded="lg">
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
        <v-row justify="center">
            <v-col cols="2">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="pro in 12" :key="pro" cols="2">
                <v-skeleton-loader type="avatar" class="d-flex justify-center" />
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 2" :key="img" cols="6" lg="6" md="6">
                <v-skeleton-loader :loading="loading" height="240" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
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
        <v-row>
            <v-col cols="12">
                <v-card class="px-5" rounded="lg">
                    <v-row justify="center" align="center">
                        <v-col cols="2">
                            <v-skeleton-loader :loading="loading" type="text" />
                        </v-col>
                        <v-col v-for="pro in 5" :key="pro" cols="2">
                            <v-skeleton-loader type="avatar" class="d-flex justify-center" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 4" :key="img" cols="3" lg="3" md="3">
                <v-skeleton-loader :loading="loading" height="240" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col cols="2">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col v-for="pro in 5" :key="pro" class="border rounded-lg" cols="2">
                <v-skeleton-loader :loading="loading" height="240" type="image, list-item">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />

                        <v-list-item subtitle="subtitle" title="title" class="px-0" />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 4" :key="img" cols="3" lg="3" md="3">
                <v-skeleton-loader :loading="loading" height="240" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
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
        <v-row justify="center">
            <v-col v-for="img in 3" :key="img" cols="4" lg="4" md="4">
                <v-skeleton-loader :loading="loading" height="240" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col cols="2">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 3" :key="img" cols="4" lg="4" md="4">
                <v-skeleton-loader :loading="loading" height="200" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</div>

<!--  mobile size -->
<div v-if="screenSize === 'mobile'">
    <v-row justify="center">
        <v-col cols="12" lg="4" md="6">
            <v-skeleton-loader :loading="loading" height="240" type="image">
                <v-responsive>
                    <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                </v-responsive>
            </v-skeleton-loader>
        </v-col>
    </v-row>

    <v-container class="mobile-no-padd mt-4">
        <v-row>
            <v-col cols="12">
                <v-card class="px-5 py-3" rounded="lg">
                    <v-row>
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
        <v-row justify="center">
            <v-col cols="4">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="pro in 5" :key="pro" cols="2">
                <v-skeleton-loader type="avatar" class="d-flex justify-center" />
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row justify="center">
            <v-col v-for="img in 2" :key="img" cols="12">
                <v-skeleton-loader :loading="loading" height="190" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col cols="12">
                <v-row justify="start">
                    <v-col cols="4">
                        <v-skeleton-loader :loading="loading" type="text" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card class="px-5" rounded="lg">
                            <v-row>
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
        <v-row>
            <v-col cols="12">
                <v-row justify="center">
                    <v-col cols="4">
                        <v-skeleton-loader :loading="loading" type="text" />
                    </v-col>
                </v-row>
                <v-card class="px-5" rounded="lg">
                    <v-row justify="center" align="center">
                        <v-col v-for="pro in 5" :key="pro" cols="2">
                            <v-skeleton-loader type="avatar" class="d-flex justify-center" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 4" :key="img" cols="12">
                <v-skeleton-loader :loading="loading" height="150" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-row justify="start">
                    <v-col cols="4">
                        <v-skeleton-loader :loading="loading" type="text" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card class="px-5" rounded="lg">
                            <v-row>
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
        <v-row justify="center">
            <v-col v-for="img in 4" :key="img" cols="6">
                <v-skeleton-loader :loading="loading" height="150" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col cols="4">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col v-for="text in 4" :key="text" cols="3">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="start">
            <v-col cols="4">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="img in 4" :key="img" cols="12">
                <v-skeleton-loader :loading="loading" height="150" type="image">
                    <v-responsive>
                        <v-img src="src" class="rounded-lg mb-2" height="184" cover />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    props:{
        screenSize:{
            type: String,
            default:'desktop'
        },

        loading:Boolean
    }
}
</script>

