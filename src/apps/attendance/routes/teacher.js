import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import AttendanceHomePage from "../views/AttendanceHomePage.vue";
import AttendanceRecordPage from "../views/AttendanceRecordPage.vue";
import CreateAttendanceRecordPage from "../views/CreateAttendanceRecord.vue";
import EditAttendanceRecordPage from "../views/EditAttendanceRecord.vue";

export default [
	{
		path: "attendance/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "TeacherAttendance",
			defaultRoute: "TeacherAttendanceRecords",
			description: "Manage student attendance",
			icon: "mdi-calendar-check",
			getMenu: (props) => [
				{
					title: "Attendance Records",
					to: { name: "TeacherAttendanceRecords", params: props },
				},
				{
					title: "Create Record",
					to: { name: "TeacherCreateAttendanceRecord", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: AttendanceHomePage,
				name: "TeacherAttendanceRecords",
			},
			{
				path: "create/",
				component: CreateAttendanceRecordPage,
				name: "TeacherCreateAttendanceRecord",
			},
			{
				path: ":recordId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "TeacherAttendanceRecord",
					getDisplayName: async (params) =>
						`Attendance - ${(await api.get(`api/attendance/${params.recordId}/`)).data.student_details.user_details.full_name}`,
					getMenu: (props) => [
						{
							title: "View Record",
							to: { name: "TeacherAttendanceRecord", params: props },
						},
						{
							title: "Edit Record",
							to: { name: "TeacherEditAttendanceRecord", params: props },
						},
					],
				},
				children: [
					{
						path: "",
						component: AttendanceRecordPage,
						name: "TeacherAttendanceRecord",
						props: true,
					},
					{
						path: "edit/",
						component: EditAttendanceRecordPage,
						name: "TeacherEditAttendanceRecord",
						props: true,
					},
				],
			},
		],
	},
];
