import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import TeacherPage from "../views/TeacherPage.vue";
// import TeachersPage from "../views/TeachersPage.vue";

export default [
	{
		path: "teachers/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Teachers",
			defaultRoute: "Teachers",
			description: "View your teachers",
			getMenu: () => [
				{
					title: "All Teachers",
					to: { name: "Teachers" },
				},
			],
			icon: "mdi-account-tie",
		},
		children: [
			// {
			// 	path: "all/",
			// 	component: TeachersPage,
			// 	name: "Teachers",
			// },
			{
				path: ":teacherId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "Teacher",
					getDisplayName: async (params) =>
						(await api.get(`api/accounts/teachers/${params.teacherId}/`)).data
							.user_details.full_name,
					getMenu: (props) => [
						{
							title: "View Teacher",
							to: { name: "Teacher", params: props },
						},
					],
					icon: "mdi-account-tie",
				},
				children: [
					{
						path: "view/",
						component: TeacherPage,
						name: "Teacher",
						props: true,
					},
				],
			},
		],
	},
];
