import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import login from '@/views/auth/login.vue';

const router = createRouter( {
    history: createWebHistory( import.meta.env.BASE_URL ),
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
            component: () => import( '../views/AboutView.vue' ),
            meta: {
                layout: 'main',
                auth: false
            }
        },

        {
            path: '/bigdata-dx-load',
            name: 'bigdata-dx-load',
            component: () => import( '@/templates/bigdata/bigdata-dx-load.vue' ),
            meta: {
                layout: 'main',
                auth: false
            }
        },

        {
            path: '/dx-form',
            name: 'dx-form',
            component: () => import( '@/templates/dx-form/dx-form.vue' ),
            meta: {
                layout: 'main',
                auth: false
            }
        }
    ]
} );

export default router;
