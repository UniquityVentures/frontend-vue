import adminAnnouncementsRoutes from "@/apps/announcements/routes/admin";
import adminAssignmentsRoutes from "@/apps/assignments/routes/admin";
import adminAttachmentRoutes from "@/apps/attachments/routes/admin";
import adminAttendanceRoutes from "@/apps/attendance/routes/admin";
import adminBatchesRoutes from "@/apps/batches/routes/admin";
import adminCalendarRoutes from "@/apps/calendar/routes/admin";
import adminCoursesRoutes from "@/apps/courses/routes/admin";
import adminFinancesRoutes from "@/apps/finances/routes/admin";
import adminStudentsRoutes from "@/apps/students/routes/admin";
import adminTeachersRoutes from "@/apps/teachers/routes/admin";
import AdminDashboardPage from "@/views/Dashboards/AdminDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "AdminDashboard",
		component: AdminDashboardPage,
	},
	...adminBatchesRoutes,
	...adminCoursesRoutes,
	...adminStudentsRoutes,
	...adminTeachersRoutes,
	...adminAnnouncementsRoutes,
	...adminAssignmentsRoutes,
	...adminAttachmentRoutes,
	...adminCalendarRoutes,
	...adminFinancesRoutes,
	...adminAttendanceRoutes,
];
