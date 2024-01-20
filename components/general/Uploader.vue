<template>
<div class="uploader">
    <div class="uploader__upload-box">
    <v-row
        justify="center"
        align="center"
        class="pa-5 px-5">
        <div class="pr-5 d-flex align-center uploader__upload-box__items">
            <img src="@/assets/images/cloud-upload.png" alt="shavaz upload image">
            <div>
                <div class="pa-3" @drop.prevent="onDrop">
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
        class="mt-10 ">
        <v-col cols="12" md="3">
            <div class="d-flex justify-space-between">
                <span class="t12 w400 text-grey-lighten-1">IMG-{{ image.name }}</span>
                <span class="mr-15">
                    <v-icon color="red" icon="mdi-delete-outline"/>
                </span>
            </div>
            <v-progress-linear v-model="progressUpload" color="success"></v-progress-linear>
        </v-col>
    </div>
</template>
</div>
</template>
<script setup>
import { AxiosCall } from '~/utils/axios_call.js'
import {
    ref,
    onMounted,
    onUnmounted,
    computed,
    watch,
    toRefs
} from 'vue'
import {
    useStore
} from 'vuex'

const emit = defineEmits(['files-dropped', 'getImage'])
const imageId = ref(null)
let file = ref(null)
const files = ref([])
const uploadLoading = ref(false)
let images = ref([])
const store = useStore()
const userToken = useCookie('userToken');
const props = defineProps(['index'])

function onDrop(e) {
    files.value = e.dataTransfer.files
    file = files.value[0]
    console.log(files.value.length)
    submitImage(0)
}
/**
 * Select file
 */
function selectFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        file = e.target.files[0];
        submitImage()
    }
    input.click();
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}
/**
 * Submit Image
 */
async function submitImage(index) {

    uploadLoading.value = true

    //if (file.type && file.type.startsWith('image/')) {

    var formdata = new FormData();
    const AxiosMethod = new AxiosCall()
    formdata.append('file', file)
    formdata.append('module', 'page')
    AxiosMethod.using_auth = true
    AxiosMethod.store = store
    AxiosMethod.token = userToken
    AxiosMethod.end_point = 'file-manager/direct/store'
    AxiosMethod.form = formdata
    let data = await AxiosMethod.axios_image_upload()
    if (data) {
        uploadLoading.value = false
        if (index >= 0) {
            console.log(files.value.length - 1, index)
            if (files.value.length - 1 > index) {

                file = files.value[++index]
                const deletePosition = (index) => {
                    files.value.splice(index, 1)
                }
                files.value = deletePosition
                submitImage(index)
                emit('getImage', data , props.index);
            }
        } else {
            emit('getImage', data, props.index);
        }

        /* openToast(
            store,
            'آپلود با موفقیت انجام شد.',
            "success"
        ); */

    } else {
        uploadLoading.value = false
        /* openToast(
            store,
            'تو فرایند آپلود به مشکلی خوردیم',
            "error"
        ); */
    }
}

/**
 * Get Item
 */
function preventDefaults(e) {
    e.preventDefault()
}
const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const confirmModal = computed(function () {
    return store.getters['get_confirmForm'].confirmModal
});
const progressUpload = computed(function () {
    return store.getters['get_progressUpload']
});

// This part has this error : emitOption
/* watch(confirmModal, (newVal, oldValue) => {
    if (!newVal) {
        if (localStorage.getItem('deleteObject') === 'done') {
            let findImageIndex = images.value.findIndex(image => image.imageId == imageId.value)
            images.value.splice(findImageIndex, 1)
            localStorage.removeItem('deleteObject')
        }
    }
}); */

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
.uploader{
    &__upload-box{
        border-radius: 12px;
        border: 1px dashed var(--Gray-200, #EEE);

        .v-btn{
            box-shadow: none;
            background: #FBE9F3;
            width: 110px !important;

            &__content{
                font-size: 14px;
                color:#757575
            }
        }

        &__items{
            @include gbp (0, 768) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .mdi-delete-outline{
        font-size: 15px;
    }
}

</style>
