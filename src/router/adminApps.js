import announcementsAdminRoutes from "@/apps/announcements/routes/adminRoutes";
import assignmentsRoutes from "@/apps/assignments/routes";
import attachmentRoutes from "@/apps/attachments/routes";
import attendanceRoutes from "@/apps/attendance/routes";
import batchesRoutes from "@/apps/batches/routes";
import calendarRoutes from "@/apps/calendar/routes";
import coursesRoutes from "@/apps/courses/routes";
import financesRoutes from "@/apps/finances/routes";
import studentsRoutes from "@/apps/students/routes";
import teachersAdminRoutes from "@/apps/teachers/routes/adminRoutes";
import AdminDashboardPage from "@/views/Dashboards/AdminDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "Dashboard",
		component: AdminDashboardPage,
	},
	...batchesRoutes,
	...coursesRoutes,
	...studentsRoutes,
	...teachersAdminRoutes,
	...announcementsAdminRoutes,
	...assignmentsRoutes,
	...attachmentRoutes,
	...calendarRoutes,
	...financesRoutes,
	...attendanceRoutes,
];
