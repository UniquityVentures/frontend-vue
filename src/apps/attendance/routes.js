import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AttendanceHomePage from "./views/AttendanceHomePage.vue";
// Import other attendance-related views as needed

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
			],
		},
		children: [
			{
				path: "all/",
				component: AttendanceHomePage,
				name: "AttendanceRecords",
			},
		],
	},
];
