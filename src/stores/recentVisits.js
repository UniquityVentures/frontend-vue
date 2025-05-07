import { defineStore } from "pinia";

export const useRecentVisitStore = defineStore("recentVisits", {
	state: () => ({
		visits: [],
		maxEntries: 5,
	}),

	getters: {
		getVisits: (state) => state.visits,
		getLatestVisit: (state) => state.visits[0] || null,
		hasVisited: (state) => (path) =>
			state.visits.some((visit) => visit.path === path),
	},

	actions: {
		addVisit(route) {
			const timestamp = new Date().toISOString();
			let name = route.name || route.meta?.title || route.path || "Unnamed";
			if (typeof route.meta?.getDisplayName === "function") {
			  name = route.meta.getDisplayName(route.params || {});
			}
		  
			const newVisit = {
			  path: route.fullPath,
			  name,
			  routeName: route.name,
			  timestamp,
			};
		  
			this.visits = this.visits.filter((v) => v.path !== newVisit.path);
		  
			this.visits.unshift(newVisit);
			this.visits = this.visits.slice(0, this.maxEntries);
		},
		
		clearVisits() {
			this.visits = [];
		},
	},

	persist: {
		paths: ["visits"],
	},
});
