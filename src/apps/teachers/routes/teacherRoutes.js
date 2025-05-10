import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import TeacherPage from "@/apps/teachers/views/TeacherPage.vue";
import TeacherNoticeBoardPage from "@/apps/teachers/views/TeacherNoticeBoardPage.vue";
import TeachersMasterPage from "@/apps/teachers/views/TeachersMasterPage.vue";
import TeachersPage from "@/apps/teachers/views/TeachersPage.vue";
export default [
	{
		path: "teachers/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Teachers",
			defaultRoute: "TeachersMaster",
			description: "View and manage teachers",
			getMenu: (props) => [
				{
					title: "Teachers Master",
					to: { name: "TeachersMaster", params: props },
				},
				{
					title: "All Teachers",
					to: { name: "Teachers", params: props },
				},
			],
			icon: "mdi-account-tie",
		},
		children: [
			{
				path: "master/",
				component: TeachersMasterPage,
				name: "TeachersMaster",
			},
			{
				path: "all/",
				component: TeachersPage,
				name: "Teachers",
			},
			{
				path: ":teacherId/",
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
							title: "Notice Board",
							to: { name: "TeacherNoticeBoard", params: props },
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
						path: "announcements/",
						component: TeacherNoticeBoardPage,
						name: "TeacherNoticeBoard",
						props: true,
					},
				],
			},
		],
	},
];
