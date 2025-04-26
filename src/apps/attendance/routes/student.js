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
			getDisplayName: () => "Attendance",
			defaultRoute: "StudentAttendanceRecords",
			description: "Manage student attendance",
			icon: "mdi-calendar-check",
			getMenu: (props) => [
				{
					title: "Attendance Records",
					to: { name: "StudentAttendanceRecords", params: props },
				},
				{
					title: "Create Record",
					to: { name: "StudentCreateAttendanceRecord", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: AttendanceHomePage,
				name: "StudentAttendanceRecords",
			},
			{
				path: "create/",
				component: CreateAttendanceRecordPage,
				name: "StudentCreateAttendanceRecord",
			},
			{
				path: ":recordId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "StudentAttendanceRecord",
					getDisplayName: async (params) =>
						`Attendance - ${(await api.get(`api/attendance/${params.recordId}/`)).data.student_details.user_details.full_name}`,
					getMenu: (props) => [
						{
							title: "View Record",
							to: { name: "StudentAttendanceRecord", params: props },
						},
						{
							title: "Edit Record",
							to: { name: "StudentEditAttendanceRecord", params: props },
						},
					],
				},
				children: [
					{
						path: "",
						component: AttendanceRecordPage,
						name: "StudentAttendanceRecord",
						props: true,
					},
					{
						path: "edit/",
						component: EditAttendanceRecordPage,
						name: "StudentEditAttendanceRecord",
						props: true,
					},
				],
			},
		],
	},
];
