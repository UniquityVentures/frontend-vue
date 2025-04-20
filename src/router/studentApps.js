import announcementStudentRoutes from "@/apps/announcements/routes/studentRoutes";
import StudentDashboardPage from "@/views/Dashboards/StudentDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: StudentDashboardPage,
	},
	...announcementStudentRoutes,
];
