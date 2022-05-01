//import routesChild from "./routes_child";
import i18n from "../lang/index"

const routes = [
    {
        path: "/",
        name: "main",
        meta: {
            parent: "",
            needLogin: false,
            title: "totems"
        },
        component: () =>
            import("../views/Home/main.vue"),
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
        path: "/chart",
        name: "chart",
        meta: {
            parent: "Home",
            needLogin: false,
            title: "$t('routes.browser')"
        },
        component: () =>
            import("../views/Home/chart.vue"),
        children: [
            
        ]
    }
]
export default routes;