//import routesChild from "./routes_child";
import i18n from "../lang/index"

const routes = [
    {
        path: "/",
        name: "index",
        meta: {
            parent: "",
            needLogin: false,
            title: "totems"
        },
        component: () =>
            import("../views/Home/index.vue"),
        children: [
            
        ]
    },
    {
        path: "/test",
        name: "test",
        meta: {
            parent: "Home",
            needLogin: false,
            title: "$t('routes.browser')"
        },
        component: () =>
            import("../views/Home/test.vue"),
        children: [
            
        ]
    },
    {
        path: "/index",
        name: "index",
        meta: {
            parent: "Home",
            needLogin: false,
            title: "$t('routes.browser')"
        },
        component: () =>
            import("../views/Home/index.vue"),
        children: [
            
        ]
    }
]
export default routes;