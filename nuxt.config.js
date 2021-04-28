export default {
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "Kinapp",
    htmlAttrs: { lang: "ja" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "content-language", content: "ja" },
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox"
      }
    ],
    link: [
      { rel: "icon", type: "images/favicon.svg", href: "/favicon.svg" },
      { rel: "stylesheet", href: "/css/main.css" }
    ]
    // script: [{ type: "text/javascript", src: "/js/main.js", charset: "utf-8" }]
  },

  /*
   ** Nuxt.js modules
   ** Doc: https://modules.nuxtjs.org
   */
  modules: ["nuxt-client-init-module"],

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/docs/2.x/directory-structure/plugins
   */
  plugins: [
    { src: "~/plugins/main.js", mode: "client", ssr: true },
    { src: "~/plugins/firebase.js", ssr: false },
    { src: "~/plugins/persistedstate.js", ssr: false }
  ],
  loading: "~/components/loading.vue"
};
