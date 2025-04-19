// Layouts
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
// Routes in Apps
import adminRoutes from "@/router/adminApps";
import studentRoutes from "@/router/studentApps";
import { useAuthStore } from "@/stores/auth";
import AccessDeniedPage from "@/views/AccessDeniedPage.vue";
import AccountsPage from "@/views/AccountsPage.vue";
import AllAppsPage from "@/views/AllAppsPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
// Pages
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import TestPage from "@/views/TestPage.vue";
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
		path: "/accounts",
		name: "Accounts",
		component: AccountsPage,
		meta: { requiresAuth: true },
	},
	{
		path: "/access_denied",
		name: "Access Denied",
		component: AccessDeniedPage,
	},
	{
		path: "/test",
		name: "test_area",
		component: TestPage,
	},
	{
		path: "/app/",
		component: DashboardLayout,
		children: [
			{
				path: "all/",
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
			...adminRoutes.map(route => ({
				...route,
				meta: { 
					...route.meta,
					accountType: 'Admin'
				}
			})),
			...studentRoutes.map(route => ({
				...route,
				meta: { 
					...route.meta,
					accountType: 'Student'
				}
			})),
		],
	},
];

const router = createRouter({
	history: createWebHistory("/"),
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
	
	// Check account type restrictions
	if (to.matched.some((record) => record.meta.accountType)) {
		const accountType = authStore.account?.group_details?.name;
		if (to.matched.some((record) => 
			record.meta.accountType && record.meta.accountType !== accountType)) {
			return next({ name: "Access Denied" });
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
