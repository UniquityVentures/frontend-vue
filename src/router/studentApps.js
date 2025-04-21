import announcementStudentRoutes from "@/apps/announcements/routes/studentRoutes";
import teachersStudentRoutes from "@/apps/teachers/routes/studentRoutes";
import StudentDashboardPage from "@/views/Dashboards/StudentDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: StudentDashboardPage,
	},
	...announcementStudentRoutes,
	...teachersStudentRoutes,
];
