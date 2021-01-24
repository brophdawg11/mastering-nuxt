export default {
    components: true,

    head: {
        titleTemplate: 'Mastering Nuxt: %s',
        htmlAttrs: {
            lang: 'en',
        },
        bodyAttrs: {
            class: ['my-style'],
        },
        meta: [{
            charset: 'utf-8',
        }],
    },

    router: {
        prefetchLinks: false,
    },

    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/tailwindcss',
    ],

    plugins: [
        '~/plugins/api',
        '~/plugins/maps.client',
    ],

    modules: [
    ],

    css: [
        '@/assets/css/reset.css',
    ],
};
