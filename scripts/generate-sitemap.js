// scripts/generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/our-business', changefreq: 'weekly', priority: 0.7 },
  { url: '/products', changefreq: 'weekly', priority: 0.7 },
  { url: '/media', changefreq: 'weekly', priority: 0.6 },
  { url: '/disclaimer', changefreq: 'yearly', priority: 0.3 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/cookie-policy', changefreq: 'yearly', priority: 0.3 },
];

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://hs-india.com' });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  routes.forEach(route => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');
})();
// This script generates a sitemap.xml file for the application.