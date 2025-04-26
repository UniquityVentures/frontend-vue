import studentAnnouncementRoutes from "@/apps/announcements/routes/student";
import studentTeachersRoutes from "@/apps/teachers/routes/student";
import StudentDashboardPage from "@/views/Dashboards/StudentDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "StudentDashboard",
		component: StudentDashboardPage,
	},
	...studentAnnouncementRoutes,
	...studentTeachersRoutes,
];
