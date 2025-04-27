import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import CreateTeacherPage from "@/apps/teachers/views/CreateTeacherPage.vue";
import EditTeacherPage from "@/apps/teachers/views/EditTeacherPage.vue";
import TeacherPage from "@/apps/teachers/views/TeacherPage.vue";
import TeachersPage from "@/apps/teachers/views/TeachersPage.vue";

export default [
	{
		path: "teachers/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Teachers",
			defaultRoute: "Teachers",
			description: "View and manage teachers",
			getMenu: (props) => [
				{
					title: "View Teachers",
					to: { name: "Teachers", params: props },
				},
				{
					title: "Create Teacher",
					to: { name: "CreateTeacher", params: props },
				},
			],
			icon: "mdi-account-tie",
		},
		children: [
			{
				path: "all/",
				component: TeachersPage,
				name: "Teachers",
			},
			{
				path: "create/",
				component: CreateTeacherPage,
				name: "CreateTeacher",
			},
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
						{
							title: "Edit Teacher",
							to: { name: "EditTeacher", params: props },
						},
					],
					icon: "mdi-account-tie",
				},
				children: [
					{
						path: "view/",
						component: TeacherPage,
						//component: StudentPage,
						name: "Teacher",
						props: true,
					},
					{
						path: "edit/",
						component: EditTeacherPage,
						name: "EditTeacher",
						props: true,
					},
				],
			},
		],
	},
];
