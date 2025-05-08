import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import PreferencesPage from "./views/PreferencesPage.vue";
import ReplacementsPage from "./views/ReplacementsPage.vue";

export default [
	{
		path: "preferences/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Preferences",
			defaultRoute: "Preferences",
			description: "View and manage preferences",
			getMenu: (props) => [
				{
					title: "View Preferences",
					to: { name: "Preferences", params: props },
				},
				{
					title: "View Replacements",
					to: { name: "Replacements", params: props },
				},
			],
			icon: "mdi-paperclip",
		},
		children: [
			{
				path: "preferences/",
				component: PreferencesPage,
				name: "Preferences",
			},
			{
				path: "replacements/",
				component: ReplacementsPage,
				name: "Replacements",
			},
		],
	},
];
