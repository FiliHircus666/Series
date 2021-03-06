//1. routes komponenseinek importálása
import Fooldal from "../components/routes/Fooldal.vue";
import Users from "../components/routes/Users.vue";
import Login from "../components/routes/Login.vue";
import Profile from "../components/routes/Profile.vue";
import NotFound from "../components/routes/NotFound.vue";
import Series from "../components/routes/Series.vue";
import Register from "../components/routes/Register.vue";
import Favorite from "../components/routes/Favorite.vue";
import Category from "../components/routes/Categories.vue";



//2. route - komponens hozzárendelés
const routes = [{
        name: "users",
        path: "/users/",
        component: Users,
        meta: {
            requiresAuth: false
            
        }
    },
    {
        name: "login",
        path: "/login/",
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "fooldal",
        path: "/",
        component: Fooldal,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "profile",
        path: "/profile",
        component: Profile,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "series",
        path: "/series",
        component: Series,
        meta: {
            requiresAuth: false
        }
    },{
        name: "categories",
        path: "/categories",
        component: Category,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "favorite",
        path: "/favorite",
        component: Favorite,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "404",
        path: '/404',
        component: NotFound,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '*',
        redirect: '/404'
    }
];

//3. Export, hogy kívülről elérhető legyen
export default routes;