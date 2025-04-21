import announcementStudentRoutes from "@/apps/announcements/routes/studentRoutes";
import calendarStudentRoutes from "@/apps/calendar/routes/studentRoutes";
import teachersStudentRoutes from "@/apps/teachers/routes/studentRoutes";
import StudentDashboardPage from "@/views/Dashboards/StudentDashboardPage.vue";
import coursesStudentRoutes from "@/apps/courses/routes/studentRoutes";
export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: StudentDashboardPage,
	},
	...announcementStudentRoutes,
	...teachersStudentRoutes,
	...calendarStudentRoutes,
	...coursesStudentRoutes,
];
