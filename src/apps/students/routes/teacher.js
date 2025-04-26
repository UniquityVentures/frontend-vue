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
			defaultRoute: "TeacherStudents",
			description: "View and manage students",
			icon: "mdi-account-school",
			getMenu: (props) => [
				{
					title: "View Students",
					to: { name: "TeacherStudents", params: props },
				},
				{
					title: "Create Student",
					to: { name: "TeacherCreateStudent", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: StudentsPage,
				name: "TeacherStudents",
			},
			{
				path: "create/",
				component: CreateStudentPage,
				name: "TeacherCreateStudent",
			},
			{
				path: ":studentId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "TeacherStudent",
					getDisplayName: async (params) =>
						(await api.get(`api/accounts/students/${params.studentId}/`)).data
							.user_details.full_name,
					getMenu: (props) => [
						{
							title: "View Student",
							to: { name: "TeacherStudent", params: props },
						},
						{
							title: "Edit Student",
							to: { name: "TeacherEditStudent", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: StudentPage,
						name: "TeacherStudent",
						props: true,
					},
					{
						path: "edit/",
						component: EditStudentsPage,
						name: "TeacherEditStudent",
						props: true,
					},
				],
			},
		],
	},
];
