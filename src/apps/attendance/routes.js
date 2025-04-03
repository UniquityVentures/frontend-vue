import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import AttendanceHomePage from "./views/AttendanceHomePage.vue";
import AttendanceRecordPage from "./views/AttendanceRecordPage.vue";
import CreateAttendanceRecordPage from "./views/CreateAttendanceRecord.vue";
import EditAttendanceRecordPage from "./views/EditAttendanceRecord.vue";

export default [
	{
		path: "attendance/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Attendance",
			defaultRoute: "AttendanceRecords",
			description: "Manage student attendance",
			icon: "mdi-calendar-check",
			getMenu: (props) => [
				{
					title: "Attendance Records",
					to: { name: "AttendanceRecords", params: props },
				},
				{
					title: "Create Record",
					to: { name: "CreateAttendanceRecord", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: AttendanceHomePage,
				name: "AttendanceRecords",
			},
			{
				path: "create/",
				component: CreateAttendanceRecordPage,
				name: "CreateAttendanceRecord",
			},
			{
				path: ":recordId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "AttendanceRecord",
					getDisplayName: async (params) =>
						`Attendance - ${(await api.get(`api/attendance/${params.recordId}/`)).data.student_details.user_details.full_name}`,
					getMenu: (props) => [
						{
							title: "View Record",
							to: { name: "AttendanceRecord", params: props },
						},
						{
							title: "Edit Record",
							to: { name: "EditAttendanceRecord", params: props },
						},
					],
				},
				children: [
					{
						path: "",
						component: AttendanceRecordPage,
						name: "AttendanceRecord",
						props: true,
					},
					{
						path: "edit/",
						component: EditAttendanceRecordPage,
						name: "EditAttendanceRecord",
						props: true,
					},
				],
			},
		],
	},
];
