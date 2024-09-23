<template>
  <div class="uploader">
    <div class="uploader__upload-box">
      <v-row
          justify="center"
          align="center"
          class="pa-6 px-5 flex-column"
          @dragover.prevent
          @drop.prevent="onDrop">
        <div class="d-flex align-center uploader__upload-box__items">
          <v-icon icon="mdi-folder-plus-outline" color="primary" class="mb-2"/>
        </div>
        <v-btn
            width="122"
            height="25"
            :loading="uploadLoading"
            @click="selectFile()">
          <span>افزودن فایل</span>
        </v-btn>
      </v-row>
    </div>

    <nav v-if="rules && rules.length" class="uploader__rules pr-3 mt-3">
      <ul>
        <li class="t12 w500 number-font text-sGrayLighten2 mb-1" v-for="(rule, index) in rules" :key="index">
          {{ rule }}
        </li>
      </ul>
    </nav>

    <div v-if="uploadedFiles.length" class="scroll--x">
      <div class="mt-2 d-flex align-center">
        <div v-for="(image, index) in uploadedFiles" :key="`image_${index}`" class="uploader__image br8 s-border s-border--medium s-border--gray ml-2 ov-h">
          <img :src="image.url" width="146" height="88"/>
          <div class="uploader__image__trash">
            <generalSheetsDelete
                v-if="isMobile"
                title="حذف عکس "
                text="آیا از حذف عکس بارگذاری شده اطمینان  دارید؟"
                submitText="حذف"
                buttonType="icon"
                @removeProduct="deleteImage(image.id)"/>

            <generalModalsDelete
                v-else
                title="حذف عکس "
                text="آیا از حذف عکس بارگذاری شده اطمینان  دارید؟"
                submitText="حذف"
                buttonType="icon"
                @removeProduct="deleteImage(image.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      uploadedFiles:[],
      uploadLoading: false,
      file: null
    }
  },

  props:{
    /**
     * List of your rule text
     */
    rules: Array,

    isMobile:Boolean,
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

    /**
     * Select file
     */
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

    /**
     * Upload image
     */
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
            this.$store.commit('set_snackBar', {
              show:true , text:'فایل مورد نظر با موفقیت ذخیره شد.' , status:'success'
            })
            this.$emit('getImage', response?.data?.data?.data);
            this.uploadedFiles.push(response?.data?.data?.data);
          })
          .catch((err) => {
          }).finally(() => {
        this.uploadLoading = false;
      });
    },

    /**
     * Delete image
     * @param {*} id
     */
    deleteImage(id){
      const index = this.uploadedFiles.findIndex(item => item.id === id);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.uploader {
  &__upload-box {
    border-radius: 12px;
    border: 1px dashed var(--Primery-Primery, #D72685);
    background: #fff;

    >div.v-row{
      @include gbp (0, 768) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .v-btn {
      box-shadow: none;
      background: transparent;
      width: 110px !important;

      &:hover,
      :focus{
        background: transparent;
      }

      &__content {
        span{
          font-size: 12px;
          color: var(--Primery-Primery, #D72685);
          font-variation-settings: "wght" 700 !important;
        }
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

  &__image{
    position: relative;
    width: 146px;
    flex: 0 0 146px;
    overflow: hidden;
    height: 96px;

    img{
      width: 100%;
      min-height: 100%;
      display: block;
    }

    &__trash{
      width: 24px;
      height: 24px;
      border: 1px solid #E8E8E8;
      border-radius: 6px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 6px;
      left: 6px;

      .v-icon{
        font-size: 20px !important;
      }
    }
  }

  .mdi-delete-outline {
    font-size: 15px;
  }
}
</style>
