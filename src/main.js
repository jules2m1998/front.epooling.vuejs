import {createApp} from "vue";
import {createStore} from 'vuex'
import {createWebHistory, createRouter} from "vue-router";
import account from "@/store/account";
import user from "@/store/user";
import notice from "@/store/notice";
import city from "@/store/city";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Settings from "@/views/admin/Settings.vue";
import AnnouncesIndex from "@/views/admin/Announces/Index.vue";
import AnnouncesList from "@/views/admin/Announces/List.vue";
import AnnouncesForm from "@/views/admin/Announces/Form.vue";
import AnnouncesItem from "@/views/admin/Announces/Item.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Index from "@/views/Index.vue";
import AllAnnounces from "@/views/admin/AllAnnounces";
import PropositionList from "@/views/admin/propositions/PropositionList";

// routes

const routes = [
    {
        path: "/admin",
        redirect: "/admin/all",
        component: Admin,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "/admin/all",
                component: AllAnnounces,
                name: "all",
                meta: {
                    requiredUser: true
                }
            },
            {
                path: "/admin/settings",
                component: Settings,
                name: "settings",
            },
            {
                path: "/admin/announce",
                name: "announce",
                meta: {
                    requiredUser: true
                },
                redirect: {
                    name: "announce.list"
                },
                component: AnnouncesIndex,
                children: [
                    {
                        path: "/admin/dashboard/announce/list",
                        component: AnnouncesList,
                        name: "announce.list"
                    },
                    {
                        path: "/admin/dashboard/announce/form",
                        component: AnnouncesForm,
                        name: "announce.form"
                    },
                    {
                        path: "/admin/dashboard/announce/edit/:id",
                        component: AnnouncesForm,
                        name: "announce.edit"
                    },
                    {
                        path: "/admin/dashboard/announce/:id",
                        component: AnnouncesItem,
                        name: "announce.item"
                    }
                ]
            },
            {
                path: "/admin/propositions",
                component: PropositionList,
                name: "propositions",
                meta: {
                    requiredUser: true
                },
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
        path: "/",
        component: Index,
        name: 'home',
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
        city
    }
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = await store.dispatch('account/get_me');
        if (user) {
            if (to.matched.some(record => record.meta.requiredUser)) {
                await store.dispatch('user/getCurrentUser');
                const user = store.getters['user/user'];
                if (user) {
                    next();
                } else {
                    next({
                        path: '/admin/settings',
                        query: {redirect: to.fullPath}
                    })
                }
            } else {
                next();
            }
        } else {
            store.commit('account/REMOVE_TOKEN')
            next({
                path: '/auth/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
})

createApp(App).use(router).use(store).mount("#app");
