<template>
<v-row v-if="screenSize === 'desktop'" justify="start">
    <v-col cols="4">
        <v-skeleton-loader :loading="loading" type="text" />
    </v-col>
</v-row>

<v-row>
    <v-col class="pa-3" cols="12" lg="5">
        <v-skeleton-loader :loading="loading" height="351" type="image, list-item">
            <v-responsive>
                <v-img src="src" class="rounded-lg mb-2" height="351" cover />
            </v-responsive>
        </v-skeleton-loader>
    </v-col>

    <v-col class="pa-3" cols="12" lg="7">
        <v-row justify="end" v-if="screenSize === 'desktop'">
            <v-col cols="3">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>

        <v-row justify="start" v-if="screenSize === 'mobile'">
            <v-col cols="7">
                <v-skeleton-loader :loading="loading" type="text" />
            </v-col>
        </v-row>

        <v-row justify="start" v-if="screenSize === 'desktop'">
            <v-col cols="12">
                <v-skeleton-loader :loading="loading" height="140" type="list-item-two-line">
                    <v-responsive>
                        <v-list-item subtitle="subtitle" title="title" class="px-0" />
                    </v-responsive>
                </v-skeleton-loader>
            </v-col>
        </v-row>
    </v-col>
</v-row>

<v-row v-if="screenSize === 'desktop'">
    <v-col cols="12">
        <v-card class="px-5 py-3" rounded="lg">
            <v-row>
                <v-col v-for="pro in 4" :key="pro" cols="3">
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

<v-row justify="start">
    <v-col cols="2">
        <v-skeleton-loader :loading="loading" type="text" />
    </v-col>
</v-row>

<v-row justify="space-between" v-if="screenSize === 'desktop'">
    <v-col v-for="pro in 5" :key="pro" class="border rounded-lg" cols="2">
        <v-skeleton-loader :loading="loading" height="240" type="image, list-item">
            <v-responsive>
                <v-img src="src" class="rounded-lg mb-2" height="184" cover />

                <v-list-item subtitle="subtitle" title="title" class="px-0" />
            </v-responsive>
        </v-skeleton-loader>
    </v-col>
</v-row>

<v-row justify="start" v-if="screenSize === 'mobile'">
    <v-col class="border rounded-lg" cols="12">
        <v-skeleton-loader :loading="loading" height="240" type="image, list-item">
            <v-responsive>
                <v-img src="src" class="rounded-lg mb-2" height="184" cover />

                <v-list-item subtitle="subtitle" title="title" class="px-0" />
            </v-responsive>
        </v-skeleton-loader>
    </v-col>
</v-row>

<v-row justify="start">
    <v-col cols="2">
        <v-skeleton-loader :loading="loading" type="text" />
    </v-col>
</v-row>

<v-row>
    <v-col cols="12" lg="4" md="6">
        <v-skeleton-loader :loading="loading" height="240" type="list-item-two-line">
            <v-responsive>
                <v-list-item subtitle="subtitle" title="title" class="px-0" />
            </v-responsive>
        </v-skeleton-loader>
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
