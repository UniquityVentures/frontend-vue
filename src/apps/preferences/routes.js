import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import PreferencesPage from "./views/PreferencesPage.vue";

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
			],
			icon: "mdi-paperclip",
		},
		children: [
			{
				path: "all/",
				component: PreferencesPage,
				name: "Preferences",
			},
		],
	},
];
