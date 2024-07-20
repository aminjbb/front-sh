import { defineNuxtModule } from '@nuxt/kit';
import { generateSitemaps } from '../utils/sitemapGenerator';

export default defineNuxtModule({
    async setup(_, nuxt) {
      nuxt.hook('build:before', async () => {
          const apiConfigs = [
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap` , fileName: 'sitemap.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/main`, fileName: 'sitemap-main.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/products?page_number=1`, fileName: 'products-sitemap-1.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/categories?page_number=1`, fileName: 'categories-sitemap-1.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/brands?page_number=1`, fileName: 'brands-sitemap-1.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/skus?page_number=1`, fileName: 'sku-sitemap-1.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/skus?page_number=2`, fileName: 'sku-sitemap-2.xml' },
            { apiUrl: `${nuxt.options.runtimeConfig.public.apiBase}/sitemap/game-gardoone?page_number=1`, fileName: 'game-gardoone-sitemap-1.xml' },
        ];
        await generateSitemaps(apiConfigs);
      });
    }
  });