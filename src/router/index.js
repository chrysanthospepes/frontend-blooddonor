import { createRouter, createWebHistory } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/application-form',
            name: 'application-form',
            component: () => import('../views/ApplicationFormView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/applications',
            name: 'applications',
            component: () => import('../views/UnreviewedApplicationsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/application/:id',
            name: 'application',
            component: () => import('../views/UnreviewedApplicationView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/change-email',
            name: 'change-email',
            component: () => import('../views/ChangeEmailView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/send-notification',
            name: 'send-notification',
            component: () => import('../views/SendNotificationView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/view-notification',
            name: 'view-notification',
            component: () => import('../views/ViewNotificationView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignupView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});

export default router;
