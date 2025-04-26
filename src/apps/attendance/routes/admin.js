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
			defaultRoute: "AdminAttendanceRecords",
			description: "Manage student attendance",
			icon: "mdi-calendar-check",
			getMenu: (props) => [
				{
					title: "Attendance Records",
					to: { name: "AdminAttendanceRecords", params: props },
				},
				{
					title: "Create Record",
					to: { name: "AdminCreateAttendanceRecord", params: props },
				},
			],
		},
		children: [
			{
				path: "all/",
				component: AttendanceHomePage,
				name: "AdminAttendanceRecords",
			},
			{
				path: "create/",
				component: CreateAttendanceRecordPage,
				name: "AdminCreateAttendanceRecord",
			},
			{
				path: ":recordId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "AdminAttendanceRecord",
					getDisplayName: async (params) =>
						`Attendance - ${(await api.get(`api/attendance/${params.recordId}/`)).data.student_details.user_details.full_name}`,
					getMenu: (props) => [
						{
							title: "View Record",
							to: { name: "AdminAttendanceRecord", params: props },
						},
						{
							title: "Edit Record",
							to: { name: "AdminEditAttendanceRecord", params: props },
						},
					],
				},
				children: [
					{
						path: "",
						component: AttendanceRecordPage,
						name: "AdminAttendanceRecord",
						props: true,
					},
					{
						path: "edit/",
						component: EditAttendanceRecordPage,
						name: "AdminEditAttendanceRecord",
						props: true,
					},
				],
			},
		],
	},
];
