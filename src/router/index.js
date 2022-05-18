import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import login from '@/views/login.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                layout: 'auth',
                auth: false
            }
        },
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
            path: '/bigdata-dx-load',
            name: 'bigdata-dx-load',
            component: () => import('@/templates/bigdata/bigdata-dx-load.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        },

        {
            path: '/bigdata',
            name: 'bigdata',
            component: () => import('@/templates/bigdata/bigdata-native.vue'),
            meta: {
                layout: 'main',
                auth: false
            }
        }
    ]
});

export default router;
