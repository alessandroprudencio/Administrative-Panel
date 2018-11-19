import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticleByCategory from '@/components/artigo/articleByCategory'
import ArticleById from  '@/components/artigo/articleById'
import Auth from  '@/components/auth/auth'

import {userKey} from '@/global'

const routes =[{
    name:'home',
    path:'/',
    component:Home
    },
    {
     name:'AdminPages',
     path:'/admin',
     component:AdminPages,
     meta:{ requiresAdmin:true }
    },
    {
    name:'ArticleByCategory',
    path:'/categoria/:id/artigos',
    component:ArticleByCategory
    },
    {
    name:'ArticleById',
    path:'/artigo/:id',
    component:ArticleById
    },
    {
    name:'Auth',
    path:'/auth',
    component:Auth
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

// router.beforeEach((to, from, next)=>{ // BLOQUEANDO A ROTA DE ADM CASO NAO ADMIN
//     const json = localStorage.getItem(userKey)
//     if(to.matched.some(record => record.meta.requiresAdmin)){
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({path: '/'})
//     }else{
//         next()
//     }
// })

export default router
