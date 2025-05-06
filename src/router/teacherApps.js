import TeacherDashboardPage from "@/views/Dashboards/TeacherDashboardPage.vue";
import announcementRoutes from "@/apps/announcements/routes/adminRoutes";
import calendarRoutes from "@/apps/calendar/routes";
import teachersRoutes from "@/apps/teachers/routes/adminRoutes";
import coursesRoutes from "@/apps/courses/routes/adminRoutes";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: TeacherDashboardPage,
	},
	...announcementRoutes,
	...calendarRoutes,
	...teachersRoutes,
	...coursesRoutes,
];
