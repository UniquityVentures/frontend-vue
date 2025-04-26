// Layouts
//
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
// Routes in Apps
import adminRoutes from "@/router/adminRoutes";
import teacherRoutes from "@/router/teacherRoutes";
import studentRoutes from "@/router/studentRoutes";
import { useAuthStore } from "@/stores/auth";
import AccessDeniedPage from "@/views/AccessDeniedPage.vue";
import AccountsPage from "@/views/AccountsPage.vue";
import AllAppsPage from "@/views/AllAppsPage.vue";
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
		name: "app",
		component: DashboardLayout,
		children: [
			{
				path: "all/",
				name: "All Apps",
				component: AllAppsPage,
				meta: { requiresAuth: true },
			},
			{
				path: "student/",
				component: EmptyLayout,
				meta: { requiresAuth: true },
				children: studentRoutes,
			},
			{
				path: "teacher/",
				component: EmptyLayout,
				meta: { requiresAuth: true },
				children: teacherRoutes,
			},
			{
				path: "admin/",
				component: EmptyLayout,
				meta: { requiresAuth: true },
				children: adminRoutes,
			},
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

	// Only check permissions now
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
