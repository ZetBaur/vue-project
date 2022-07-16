import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// const proxyTarget = 'http://172.16.11.197';

// const proxyTarget = 'http://172.16.10.215';

const proxyTarget = 'http://10.70.6.9';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    if (command === 'serve') {
        return {
            base: '/',

            plugins: [vue()],

            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },

            server: {
                port: 3000,

                proxy: {
                    '/storage': {
                        target: proxyTarget,
                        changeOrigin: true,
                        logLevel: 'debug'
                    },
                    '/manager-api': {
                        target: proxyTarget,
                        changeOrigin: true,
                        logLevel: 'debug'
                    },
                    '/report': {
                        target: proxyTarget,
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/report/, 'report')
                    },
                    '/manager': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) => path.replace(/^\/manager/, 'manager')
                    },
                    '/campaigns': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(/^\/campaigns/, 'campaigns')
                    },
                    '/loyalty-segment': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(
                                /^\/loyalty-segment/,
                                'loyalty-segment'
                            )
                    },
                    '/profile-segment': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(
                                /^\/profile-segment/,
                                'profile-segment'
                            )
                    },
                    '/magnum-client': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(/^\/magnum-client/, 'magnum-client')
                    },
                    '/frauds': {
                        target: proxyTarget,

                        changeOrigin: true,
                        // pathRewrite: {
                        //     '^/frauds': '/frauds/'
                        // }

                        rewrite: (path) => path.replace(/^\/frauds/, 'frauds')
                    }
                }
            }
        };
    } else {
        return {
            base: '/mng/',

            plugins: [vue()],

            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },

            server: {
                port: 3000,

                proxy: {
                    '/storage': {
                        target: proxyTarget,

                        changeOrigin: true,
                        logLevel: 'debug'
                    },
                    '/manager-api': {
                        target: proxyTarget,
                        changeOrigin: true,
                        logLevel: 'debug'
                    },
                    '/report': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) => path.replace(/^\/report/, 'report')
                    },
                    '/manager': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) => path.replace(/^\/manager/, 'manager')
                    },
                    '/campaigns': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(/^\/campaigns/, 'campaigns')
                    },
                    '/loyalty-segment': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(
                                /^\/loyalty-segment/,
                                'loyalty-segment'
                            )
                    },
                    '/profile-segment': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(
                                /^\/profile-segment/,
                                'profile-segment'
                            )
                    },
                    '/magnum-client': {
                        target: proxyTarget,

                        changeOrigin: true,

                        rewrite: (path) =>
                            path.replace(/^\/magnum-client/, 'magnum-client')
                    },
                    '/frauds': {
                        target: proxyTarget,

                        changeOrigin: true,
                        // pathRewrite: {
                        //     '^/frauds': '/frauds/'
                        // }

                        rewrite: (path) => path.replace(/^\/frauds/, 'frauds')
                    }
                }
            }
        };
    }
});

// export default defineConfig({
//     // env: loadEnv(mode, process.cwd(), ''),

//     plugins: [vue()],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url))
//         }
//     },

//     server: {
//         port: 90,
//         proxy: {
//             '/storage': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,
//                 logLevel: 'debug'
//             },
//             '/manager-api': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,
//                 logLevel: 'debug'
//             },
//             '/report': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',

//                 changeOrigin: true,

//                 rewrite: (path) => path.replace(/^\/report/, 'report')
//             },
//             '/manager': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,

//                 rewrite: (path) => path.replace(/^\/manager/, 'manager')
//             },
//             '/campaigns': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,

//                 rewrite: (path) => path.replace(/^\/campaigns/, 'campaigns')
//             },
//             '/loyalty-segment': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,

//                 rewrite: (path) =>
//                     path.replace(/^\/loyalty-segment/, 'loyalty-segment')
//             },
//             '/profile-segment': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,

//                 rewrite: (path) =>
//                     path.replace(/^\/profile-segment/, 'profile-segment')
//             },
//             '/magnum-client': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,

//                 rewrite: (path) =>
//                     path.replace(/^\/magnum-client/, 'magnum-client')
//             },
//             '/frauds': {
//                 // target: "http://172.16.10.215",
//                 // target: "http://172.16.11.197",
//                 target: 'http://10.70.6.9',
//                 changeOrigin: true,
//                 // pathRewrite: {
//                 //     '^/frauds': '/frauds/'
//                 // }

//                 rewrite: (path) => path.replace(/^\/frauds/, 'frauds')
//             }
//         }
//     }
// })
