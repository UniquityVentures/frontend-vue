import teacherAnnouncementsRoutes from "@/apps/announcements/routes/teacher";
import teacherAssignmentsRoutes from "@/apps/assignments/routes/teacher";
import teacherAttachmentRoutes from "@/apps/attachments/routes/teacher";
import teacherAttendanceRoutes from "@/apps/attendance/routes/teacher";
import teacherBatchesRoutes from "@/apps/batches/routes/teacher";
import teacherCalendarRoutes from "@/apps/calendar/routes/teacher";
import teacherCoursesRoutes from "@/apps/courses/routes/teacher";
import teacherFinancesRoutes from "@/apps/finances/routes/teacher";
import teacherStudentsRoutes from "@/apps/students/routes/teacher";
import teacherTeachersRoutes from "@/apps/teachers/routes/teacher";
import AdminDashboardPage from "@/views/Dashboards/AdminDashboardPage.vue";

export default [
	{
		path: "dashboard/",
		name: "TeacherDashboard",
		component: AdminDashboardPage,
	},
	...teacherBatchesRoutes,
	...teacherCoursesRoutes,
	...teacherStudentsRoutes,
	...teacherTeachersRoutes,
	...teacherAnnouncementsRoutes,
	...teacherAssignmentsRoutes,
	...teacherAttachmentRoutes,
	...teacherCalendarRoutes,
	...teacherFinancesRoutes,
	...teacherAttendanceRoutes,
];
