// Layouts
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
// Routes in Apps
import appRoutes from "@/router/app";
import { useAuthStore } from "@/stores/auth";
import AccessDeniedPage from "@/views/AccessDeniedPage.vue";
import AccountsPage from "@/views/AccountsPage.vue";
import AllAppsPage from "@/views/AllAppsPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
// Pages
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/login",
		component: EmptyLayout,
		children: [
			{
				path: "",
				name: "Login",
				component: LoginPage,
			},
		],
	},
	{
		path: "/access_denied",
		name: "Access Denied",
		component: AccessDeniedPage,
	},
	{
		path: "/app/",
		component: DashboardLayout,
		children: [
			{
				path: "",
				name: "All Apps",
				component: AllAppsPage,
				meta: { requiresAuth: true },
			},
			{
				path: "dashboard/",
				name: "Dashboard",
				component: DashboardPage,
				meta: { requiresAuth: true },
			},
			...appRoutes,
		],
	},
	{
		path: "/accounts",
		name: "Accounts",
		component: AccountsPage,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		const token = authStore.getAccess;
		if (!token) {
			return next({ name: "Login" });
		}
	}
	if (
		!to.matched.every((route) =>
			route.meta?.permission
				? useAuthStore().hasPermission(route.meta.permission)
				: true,
		)
	) {
		return next({ name: "Access Denied" });
	}
	next();
});

export default router;
