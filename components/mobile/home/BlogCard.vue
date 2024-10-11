<template >
<a v-if="content" class="blog-card blog-card--mobile" :href="content.link ? content.link : '#'">
  <generalKitsImageSimage :src="content.image?.image_url" :title="content.label"  :alt="content.image_alt" width="306" height="189"  />
   <div class="blog-card__title">
        <h3 v-if="content.label" class="s-title s-title--medium text-white mb-1">{{content.label}}</h3>
        <p v-if="content.description" class="s-caption s-caption--medium text-white">{{ content.description }}</p>
    </div>
</a>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object
    },
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/blog-card.scss';
</style>
