import {createApp} from "vue";
import { createStore } from 'vuex'
import {createWebHistory, createRouter} from "vue-router";
import account from "@/store/account";
import user from "@/store/user";
import notice from "@/store/notice";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// routes

const routes = [
    {
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "/admin/dashboard",
                component: Dashboard,
                name: "dashboard"
            },
            {
                path: "/admin/settings",
                component: Settings,
            },
            {
                path: "/admin/tables",
                component: Tables,
            },
            {
                path: "/admin/maps",
                component: Maps,
            },
        ],
    },
    {
        path: "/auth", // used
        redirect: "/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                component: Login,
                name: 'login',
            },
            {
                path: "/auth/register",
                component: Register,
                name: 'register',
            },
        ],
    },
    {
        path: "/landing",
        component: Landing,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/",
        component: Index,
    },
    {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const store = createStore({
    modules: {
        account,
        user,
        notice,
    }
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = await store.dispatch('account/get_me');
        if (user) {
            next();
        } else {
            store.commit('account/REMOVE_TOKEN')
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})

createApp(App).use(router).use(store).mount("#app");
