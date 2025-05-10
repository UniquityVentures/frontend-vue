import announcementsAdminRoutes from "@/apps/announcements/routes/adminRoutes";
import assignmentsRoutes from "@/apps/assignments/routes";
import attachmentRoutes from "@/apps/attachments/routes";
import attendanceRoutes from "@/apps/attendance/routes";
import batchesRoutes from "@/apps/batches/routes/adminRoutes";
import calendarAdminRoutes from "@/apps/calendar/routes/adminRoutes";
import coursesAdminRoutes from "@/apps/courses/routes/adminRoutes";
import studentsRoutes from "@/apps/students/routes";
import preferencesRoutes from "@/apps/preferences/routes";
import teachersAdminRoutes from "@/apps/teachers/routes/adminRoutes";
import AdminDashboardPage from "@/views/Dashboards/AdminDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: AdminDashboardPage,
	},
	...batchesRoutes,
	...coursesAdminRoutes,
	...studentsRoutes,
	...teachersAdminRoutes,
	...announcementsAdminRoutes,
	...assignmentsRoutes,
	...attachmentRoutes,
	...calendarAdminRoutes,
	...attendanceRoutes,
	...preferencesRoutes,
];
