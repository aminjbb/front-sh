<template>
<div class="uploader">
    <div class="uploader__upload-box">
        <v-row
            justify="center"
            align="center"
            class="pa-5 px-5"
            @dragover.prevent
            @drop.prevent="onDrop">
            <div class="pr-5 d-flex align-center uploader__upload-box__items">
                <img src="@/assets/images/cloud-upload.png" alt="shavaz upload image">
                <div>
                    <div class="pa-3">
                        <span class="t13 w400 text-grey-lighten-1">
                            فایل خود را بکشید یا از فایل‌های سیستم انتخاب کنید
                        </span>
                    </div>

                </div>
            </div>
            <v-btn
                width="122"
                :loading="uploadLoading"
                @click="selectFile()">
                <span>انتخاب فایل</span>
            </v-btn>
        </v-row>
    </div>
    <template v-if="files.length">
        <div
            v-for="(image, index) in files"
            :key="`image_${index}`"
            class="mt-2 ">
            <v-col cols="12" md="3">
                <div class="d-flex align-center">
                    <span class="ml-2">
                        <v-icon color="primary" icon="mdi-image" size="x-small" />
                    </span>
                    <span class="t12 w400 text-grey-darken-1">IMG-{{ image.name }}</span>
                </div>
            </v-col>
        </div>
    </template>
</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            files: [],
            uploadLoading: false,
            file: null
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');

        return {
            runtimeConfig,
            userToken,
        }
    },

    methods: {
        onDrop(e) {
            const files = e.dataTransfer.files
            this.file = files[0];
            this.files.push(this.file);
            if (this.file) {
                this.submitImage();
            }
        },

        selectFile() {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                this.file = e.target.files[0];
                this.files.push(this.file);
                this.submitImage()
            }
            input.click();
        },

        submitImage() {
            this.uploadLoading = true;
            const formData = new FormData()

            formData.append('file', this.file)
            formData.append('module', 'page');

            axios
                .post(this.runtimeConfig.public.apiBase + '/file-manager/direct/store', formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    if(response){
                        useNuxtApp().$toast.success("فایل مورد نظر با موفقیت ذخیره شد.", {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });

                        this.$emit('getImage', response?.data?.data?.data);
                    }
                })
                .catch((err) => {

                }).finally(() => {
                    this.uploadLoading = false;
                });
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.uploader {
    &__upload-box {
        border-radius: 12px;
        border: 1px dashed var(--Gray-200, #EEE);

        .v-btn {
            box-shadow: none;
            background: #FBE9F3;
            width: 110px !important;

            &__content {
                font-size: 14px;
                color: #757575
            }
        }

        &__items {
            @include gbp (0, 768) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .mdi-delete-outline {
        font-size: 15px;
    }
}
</style>
