import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { getCourse } from "../api";
import CoursePage from "../views/CoursePage.vue";
import CoursesExportPage from "../views/CoursesExportPage.vue";
import CoursesImportPage from "../views/CoursesImportPage.vue";
import CoursesPage from "../views/CoursesPage.vue";
import CreateCoursePage from "../views/CreateCoursePage.vue";
import EditCoursePage from "../views/EditCoursePage.vue";
import CourseAnnouncementsPage from "../views/CourseAnnouncementsPage.vue";
import CourseAssignmentsPage from "../views/CourseAssignmentsPage.vue";
import CourseSyllabusPage from "../views/CourseSyllabusPage.vue";
export default [
	{
		path: "courses/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Courses",
			defaultRoute: "TeacherCourses",
			description: "View and manage courses",
			getMenu: () => [
				{
					title: "All Courses",
					to: { name: "TeacherCourses" },
				},
				{
					title: "Create Course",
					to: { name: "TeacherCreateCourse" },
				},
				{
					title: "Import Courses",
					to: { name: "TeacherImportCourses" },
				},
				{
					title: "Export Courses",
					to: { name: "TeacherExportCourses" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "all/",
				component: CoursesPage,
				name: "TeacherCourses",
			},
			{
				path: "create/",
				component: CreateCoursePage,
				name: "TeacherCreateCourse",
			},
			{
				path: "import/",
				component: CoursesImportPage,
				name: "TeacherImportCourses",
			},
			{
				path: "export/",
				component: CoursesExportPage,
				name: "TeacherExportCourses",
			},
			{
				path: ":courseId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "TeacherCourse",
					getDisplayName: async (props) => {
						const course = await getCourse(props.courseId);
						return `${course.name} (${course.code})`;
					},
					getMenu: (params) => [
						{
							title: "View Course",
							to: { name: "TeacherCourse", params },
						},
						{
							title: "Edit Course",
							to: { name: "TeacherEditCourse", params },
						},
						{
							title: "Announcements",
							to: { name: "TeacherCourseAnnouncements", params },
						},
						{
							title: "Assignments",
							to: { name: "TeacherCourseAssignments", params },
						},
						{
							title: "Syllabus",
							to: { name: "TeacherCourseSyllabus", params },
						},
					],
					icon: "mdi-book-open-variant",
				},
				children: [
					{
						path: "view/",
						component: CoursePage,
						name: "TeacherCourse",
						props: true,
					},
					{
						path: "edit/",
						component: EditCoursePage,
						name: "TeacherEditCourse",
						props: true,
					},
					{
						path: "announcements/",
						component: CourseAnnouncementsPage,
						name: "TeacherCourseAnnouncements",
						props: true,
					},
					{
						path: "assignments/",
						component: CourseAssignmentsPage,
						name: "TeacherCourseAssignments",
						props: true,
					},
					{
						path: "syllabus/",
						component: CourseSyllabusPage,
						name: "TeacherCourseSyllabus",
						props: true,
					},
				],
			},
		],
	},
];
