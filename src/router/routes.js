//import routesChild from "./routes_child";
import i18n from "../lang/index"

const routes = [
    {
        path: "/",
        name: "main",
        meta: {
            parent: "",
            needLogin: false,
            title: "$t('routes.browser')"
        },
        component: () =>
            import("../views/Home/main.vue"),
        children: [
            
        ]
    }
]
export default routes;