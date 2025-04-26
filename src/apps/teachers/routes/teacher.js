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
			defaultRoute: "TeacherTeachers",
			description: "View and manage teachers",
			getMenu: (props) => [
				{
					title: "View Teachers",
					to: { name: "TeacherTeachers", params: props },
				},
				{
					title: "Create Teacher",
					to: { name: "TeacherCreateTeacher", params: props },
				},
			],
			icon: "mdi-account-tie",
		},
		children: [
			{
				path: "all/",
				component: TeachersPage,
				name: "TeacherTeachers",
			},
			{
				path: "create/",
				component: CreateTeacherPage,
				name: "TeacherCreateTeacher",
			},
			{
				path: ":teacherId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "TeacherTeacher",
					getDisplayName: async (params) =>
						(await api.get(`api/accounts/teachers/${params.teacherId}/`)).data
							.user_details.full_name,
					getMenu: (props) => [
						{
							title: "View Teacher",
							to: { name: "TeacherTeacher", params: props },
						},
						{
							title: "Edit Teacher",
							to: { name: "TeacherEditTeacher", params: props },
						},
					],
					icon: "mdi-account-tie",
				},
				children: [
					{
						path: "view/",
						component: TeacherPage,
						//component: StudentPage,
						name: "TeacherTeacher",
						props: true,
					},
					{
						path: "edit/",
						component: EditTeacherPage,
						name: "TeacherEditTeacher",
						props: true,
					},
				],
			},
		],
	},
];
