// Layouts
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
// Routes in Apps
import adminRoutes from "@/router/adminApps";
import studentRoutes from "@/router/studentApps";
import teacherRoutes from "@/router/teacherApps";
import { useAuthStore } from "@/stores/auth";
import AccessDeniedPage from "@/views/AccessDeniedPage.vue";
import AccountsPage from "@/views/AccountsPage.vue";
import AllAppsPage from "@/views/AllAppsPage.vue";
// Pages
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import TestPage from "@/views/TestPage.vue";
import { createRouter, createWebHistory } from "vue-router";

import { useRecentVisitStore } from "@/stores/recentVisits";

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
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Add a function to dynamically add routes based on account type
export function addAccountRoutes(accountType) {
	// First remove any existing dynamic routes
	router.getRoutes().forEach(route => {
		if (route.meta.dynamic) {
			router.removeRoute(route.name);
		}
	});

	// Add routes based on account type
	let routesToAdd = [];
	if (accountType === 'Admin') {
		routesToAdd = adminRoutes;
	} else if (accountType === 'Student') {
		routesToAdd = studentRoutes;
	} else if (accountType === 'Teacher') {
		routesToAdd = teacherRoutes;
	}
	// You can add more account types here as needed

	// Add the routes with a dynamic meta flag
	routesToAdd.forEach(route => {
		router.addRoute('app', {
			...route, 
			meta: {
				...route.meta,
				dynamic: true // Mark as dynamic for removal later
			}
		});
	});
}

// Navigation guard
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	
	// If user is authenticated but routes haven't been added yet
	if (authStore.account) {
		const accountType = authStore.account?.group_details?.name;
		// Check if we need to add routes
		if (router.getRoutes().filter(r => r.meta?.dynamic).length === 0) {
			console.log("adding routes");
			addAccountRoutes(accountType);
			// Return to same route after adding routes to refresh the navigation
			return next(to.fullPath);
		}
	}
	
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

router.afterEach((to) => {
  const store = useRecentVisitStore();
  store.addVisit(to);
});


export default router;
