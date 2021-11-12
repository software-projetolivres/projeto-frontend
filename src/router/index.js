import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/Login";
import Home from "../components/Home";
import ListaConsumidores from "../components/ListaConsumidores";
import ListaPreComunidades from "../components/ListaPreComunidades";
import CadConsumidores from "../components/CadConsumidores";
import CadPreComunidade from "../components/CadPreComunidade";
import Produtos from "../components/LstProdutos";
import Checkout from "../components/Checkout";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
            requiresAuth: true,
            }
        },
        {
            path: "/consumidores",
            name: "ListaConsumidores",
            component: ListaConsumidores,
            meta: {
            requiresAuth: true,
                is_admin: true,
            }
        },
        {
            path: "/consumidores/cadastro",
            name: "CadConsumidores",
            props: true,
            component: CadConsumidores,
        },
        {
            path: "/precomunidades",
            name: "ListaPreComunidades",
            component: ListaPreComunidades,
            meta: {
            requiresAuth: true,
                is_admin: true,
            }
        },
        {
            path: "/precomunidades/cadastro",
            name: "CadPreComunidade",
            props: true,
            component: CadPreComunidade,
            meta: {
            requiresAuth: true,
                is_admin: true,
            }
        },
        {
            path: "/produtos",
            name: "Produtos",
            component: Produtos,
            meta: {
            requiresAuth: true,
            }
        },
        {
            path: "/carrinho",
            name: "Checkout",
            component: Checkout,
            meta: {
            requiresAuth: true,
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('@livres:token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = localStorage.getItem('@livres:user')
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user === 'ROLE_ADMIN'){
                    next()
                }
                else{
                    next({ name: 'Home'})
                }
            }else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router
