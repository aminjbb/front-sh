// utils/sitemapGenerator.js
import fs from 'fs';
import fetch from 'node-fetch';
import { Builder } from 'xml2js';

async function fetchUrlsFromApi(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'Success' || !data.data) {
      throw new Error('Unexpected API response structure');
    }

    return data.data.map(item => ({
      loc: encodeURI(item.url), // Ensure URLs are valid for XML
      lastmod: new Date(item.last_mod).toISOString(),
    }));
  } catch (error) {
    console.error(`Error fetching data from API: ${error.message}`);
    return [];
  }
}

export async function generateSitemaps(apiConfigs) {
  const builder = new Builder({
    rootName: 'urlset',
    xmldec: { version: '1.0', encoding: 'UTF-8' },
  });

  for (const config of apiConfigs) {
    const urls = await fetchUrlsFromApi(config.apiUrl);

    // Log fetched URLs to inspect them
    //console.log('Fetched URLs:', urls);

    const urlset = {
      $: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
      url: urls,
    };

    try {
      //console.log('Generating XML for:', config.fileName);
      //console.log('URL Set:', JSON.stringify(urlset, null, 2)); // Log the URL set to inspect it

      // Validate URL set
      for (const url of urls) {
        if (!url.loc || !url.lastmod) {
          throw new Error(`Invalid URL entry: ${JSON.stringify(url)}`);
        }
      }

      const xml = builder.buildObject(urlset);
      fs.writeFileSync(`public/${config.fileName}`, xml);
    } catch (error) {
      console.error(`Error generating XML: ${error.message}`);
    }
  }
}