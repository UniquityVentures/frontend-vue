import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import CreateStudentPage from "./views/CreateStudentPage.vue";
import EditStudentPage from "./views/EditStudentPage.vue";
import StudentPage from "./views/StudentPage.vue";
import StudentNoticeBoardPage from "./views/StudentNoticeBoardPage.vue";
import StudentsMasterPage from "./views/StudentsMasterPage.vue";

export default [
	{
		path: "students/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Students",
			defaultRoute: "StudentsMaster",
			description: "View and manage students",
			icon: "mdi-account-school",
			getMenu: (props) => [
				{
					title: "Students Master",
					to: { name: "StudentsMaster", params: props },
				},
				{
					title: "Create Student",
					to: { name: "CreateStudent", params: props },
				},
			],
		},
		children: [
			{
				path: "master/",
				component: StudentsMasterPage,
				name: "StudentsMaster",
			},
			{
				path: "create/",
				component: CreateStudentPage,
				name: "CreateStudent",
			},
			{
				path: ":studentId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "Student",
					getDisplayName: async (params) =>
						(await api.get(`api/accounts/students/${params.studentId}/`)).data
							.user_details.full_name,
					getMenu: (props) => [
						{
							title: "View Student",
							to: { name: "Student", params: props },
						},
						{
							title: "Edit Student",
							to: { name: "EditStudent", params: props },
						},
						{
							title: "Notice Board",
							to: { name: "StudentNoticeBoard", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: StudentPage,
						name: "Student",
						props: true,
					},
					{
						path: "edit/",
						component: EditStudentPage,
						name: "EditStudent",
						props: true,
					},
					{
						path: "announcements/",
						component: StudentNoticeBoardPage,
						name: "StudentNoticeBoard",
						props: true,
					},
				],
			},
		],
	},
];
