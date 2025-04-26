import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import CreateStudentPage from "../views/CreateStudentPage.vue";
import EditStudentsPage from "../views/EditStudentsPage.vue";
import StudentPage from "../views/StudentPage.vue";
import StudentsPage from "../views/StudentsPage.vue";

export default [
	{
		path: "students/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Students",
			defaultRoute: "StudentStudents",
			description: "View and manage students",
			icon: "mdi-account-school",
			getMenu: (props) => [
				{
					title: "View Students",
					to: { name: "StudentStudents", params: props },
				},
				{
					title: "Create Student",
					to: { name: "StudentCreateStudent", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: StudentsPage,
				name: "Students",
			},
			{
				path: "create/",
				component: CreateStudentPage,
				name: "StudentCreateStudent",
			},
			{
				path: ":studentId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "StudentStudent",
					getDisplayName: async (params) =>
						(await api.get(`api/accounts/students/${params.studentId}/`)).data
							.user_details.full_name,
					getMenu: (props) => [
						{
							title: "View Student",
							to: { name: "StudentStudent", params: props },
						},
						{
							title: "Edit Student",
							to: { name: "StudentEditStudent", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: StudentPage,
						name: "StudentStudent",
						props: true,
					},
					{
						path: "edit/",
						component: EditStudentsPage,
						name: "StudentEditStudent",
						props: true,
					},
				],
			},
		],
	},
];
