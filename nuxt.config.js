require('dotenv').config();

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '1337 - Meet the Team',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/images/1337-favicon.png' } ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'node_modules/minireset.css',
    '@/assets/styles/tokens.css',
    '@/assets/styles/global.scss',
  ],

  // disable auto component imports
  components: false,

  build: { postcss: true },
};
