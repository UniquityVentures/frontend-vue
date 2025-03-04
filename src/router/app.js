import announcementsRoutes from "@/apps/announcements/routes";
import assignmentsRoutes from "@/apps/assignments/routes";
import attachmentRoutes from "@/apps/attachments/routes";
import calendarRoutes from "@/apps/calendar/routes";
import classroomsRoutes from "@/apps/classrooms/routes";
import financesRoutes from "@/apps/finances/routes";
import studentsRoutes from "@/apps/students/routes";
import subjectsRoutes from "@/apps/subjects/routes";
import teachersRoutes from "@/apps/teachers/routes";

export default [
	...classroomsRoutes,
	...studentsRoutes,
	...teachersRoutes,
	...announcementsRoutes,
	...assignmentsRoutes,
	...attachmentRoutes,
	...calendarRoutes,
	...financesRoutes,
];
