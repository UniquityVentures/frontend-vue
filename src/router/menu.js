import { useAuthStore } from "@/stores/auth"; // Pinia store

// Display routes which the user has permission to see
const defaultRouteFilter = (route) =>
	route.meta?.getDisplayName &&
	(route.meta?.permission
		? useAuthStore().hasPermission(route.meta.permission)
		: true);

const currentRouteMeta = async (route) => {
	// Get displayable routes which have a menu and matched the current route
	const routes = route.matched
		.filter(defaultRouteFilter)
		.filter((route) => route?.meta?.getMenu);

	// Process each route's metadata
	for (const matchedRoute of routes) {
		if (matchedRoute?.meta) {
			matchedRoute.meta.menu = await matchedRoute.meta.getMenu?.(route.params);
			matchedRoute.meta.displayName = await matchedRoute.meta.getDisplayName?.(route.params);
		}
	}

	return routes;
};

const getAppsMeta = async (route) =>
	// All displayable routes which are at top level
	Promise.all(
		route
			.filter(defaultRouteFilter)
			.filter((route) => !route.props)
			.map(async (route) => ({
				title: await route.meta.getDisplayName(),
				to: { name: route.meta.defaultRoute },
			})),
	);

export { defaultRouteFilter, currentRouteMeta, getAppsMeta };
