import { defineNuxtModule } from '@nuxt/kit';
import { generateSitemaps } from '../utils/sitemapGenerator';

export default defineNuxtModule({
    async setup(_, nuxt) {
      nuxt.hook('build:before', async () => {
        const apiConfigs = [
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap', fileName: 'sitemap.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/main', fileName: 'sitemap-main.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/products?page_number=1', fileName: 'products-sitemap-1.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/categories?page_number=1', fileName: 'categories-sitemap-1.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/brands?page_number=1', fileName: 'brands-sitemap-1.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/skus?page_number=1', fileName: 'sku-sitemap-1.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/skus?page_number=2', fileName: 'sku-sitemap-2.xml' },
            { apiUrl: 'https://api.shvz.ir/api/v1/sitemap/game-gardoone?page_number=1', fileName: 'game-gardoone-sitemap-1.xml' },
        ];
        await generateSitemaps(apiConfigs);
      });
    }
  });