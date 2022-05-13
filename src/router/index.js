import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/about',
            name: 'about',

            component: () => import('../views/AboutView.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/datagrid',
            name: 'datagrid',

            component: () => import('@/templates/datagrid/datagrid.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/master-detail',
            name: 'master-detail',

            component: () =>
                import('@/templates/master-detail/master-detail.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/master-detail-2',
            name: 'master-detail-2',

            component: () =>
                import('@/templates/master-detail-copy/master-detail-2.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/bigdata',
            name: 'bigdata',

            component: () => import('@/templates/bigdata/bigdata.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },

        {
            path: '/test-bigdata',
            name: 'test-bigdata',

            component: () => import('@/templates/bigdata/test-bigdata.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },
        {
            path: '/test-bigdata-client',
            name: 'test-bigdata-client',

            component: () =>
                import('@/templates/bigdata/test-bigdata-client.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        }
    ]
})

export default router
