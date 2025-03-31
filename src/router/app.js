import announcementsRoutes from "@/apps/announcements/routes";
import assignmentsRoutes from "@/apps/assignments/routes";
import attachmentRoutes from "@/apps/attachments/routes";
import attendanceRoutes from "@/apps/attendance/routes";
import batchesRoutes from "@/apps/batches/routes";
import calendarRoutes from "@/apps/calendar/routes";
import coursesRoutes from "@/apps/courses/routes";
import financesRoutes from "@/apps/finances/routes";
import studentsRoutes from "@/apps/students/routes";
import teachersRoutes from "@/apps/teachers/routes";

export default [
	...batchesRoutes,
	...coursesRoutes,
	...studentsRoutes,
	...teachersRoutes,
	...announcementsRoutes,
	...assignmentsRoutes,
	...attachmentRoutes,
	...calendarRoutes,
	...financesRoutes,
	...attendanceRoutes,
];
