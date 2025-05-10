import TeacherDashboardPage from "@/views/Dashboards/TeacherDashboardPage.vue";
import announcementRoutes from "@/apps/announcements/routes/teacherRoutes";
import calendarRoutes from "@/apps/calendar/routes/teacherRoutes";
import teachersRoutes from "@/apps/teachers/routes/teacherRoutes";
import coursesRoutes from "@/apps/courses/routes/teacherRoutes";
import batchesRoutes from "@/apps/batches/routes/teacherRoutes";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: TeacherDashboardPage,
	},
	...coursesRoutes,
	...announcementRoutes,
	...calendarRoutes,
	...teachersRoutes,
	...batchesRoutes,
];
