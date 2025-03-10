import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import RecordPage from "./views/RecordPage.vue";
import RecordsPage from "./views/RecordsPage.vue";

export default [
	{
		path: "finances/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Finances",
			defaultRoute: "Records",
			description: "View and manage finances",
			getMenu: (props) => [
				{
					title: "View Records",
					to: { name: "Records", params: props },
				},
			],
			icon: "mdi-credit-card-outline",
		},
		children: [
			{
				path: "",
				component: RecordsPage,
				name: "Records",
			},
			{
				path: ":recordId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "Record",
					getDisplayName: async (params) =>
						(await api.get(`api/finances/record/${params.recordId}/`)).data.id,
					getMenu: (props) => [
						{
							title: "View Record",
							to: { name: "Record", params: props },
						},
					],
					icon: "mdi-account-card-outline",
				},
				children: [
					{
						path: "",
						component: RecordPage,
						name: "Record",
						props: true,
					},
					/*
                    {
                        path: "edit/",
                        component: EmptyLayout,
                        name: "EditTeacher",
                        props: true,
                    },
                    */
				],
			},
		],
	},
];
