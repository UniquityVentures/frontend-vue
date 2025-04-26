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
			defaultRoute: "StudentCourses",
			description: "View and manage courses",
			getMenu: () => [
				{
					title: "All Courses",
					to: { name: "StudentCourses" },
				},
				{
					title: "Create Course",
					to: { name: "StudentCreateCourse" },
				},
				{
					title: "Import Courses",
					to: { name: "StudentImportCourses" },
				},
				{
					title: "Export Courses",
					to: { name: "StudentExportCourses" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "all/",
				component: CoursesPage,
				name: "StudentCourses",
			},
			{
				path: "create/",
				component: CreateCoursePage,
				name: "StudentCreateCourse",
			},
			{
				path: "import/",
				component: CoursesImportPage,
				name: "StudentImportCourses",
			},
			{
				path: "export/",
				component: CoursesExportPage,
				name: "StudentExportCourses",
			},
			{
				path: ":courseId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "Course",
					getDisplayName: async (props) => {
						const course = await getCourse(props.courseId);
						return `${course.name} (${course.code})`;
					},
					getMenu: (params) => [
						{
							title: "View Course",
							to: { name: "StudentCourse", params },
						},
						{
							title: "Edit Course",
							to: { name: "StudentEditCourse", params },
						},
						{
							title: "Announcements",
							to: { name: "StudentCourseAnnouncements", params },
						},
						{
							title: "Assignments",
							to: { name: "StudentCourseAssignments", params },
						},
						{
							title: "Syllabus",
							to: { name: "StudentCourseSyllabus", params },
						},
					],
					icon: "mdi-book-open-variant",
				},
				children: [
					{
						path: "view/",
						component: CoursePage,
						name: "StudentCourse",
						props: true,
					},
					{
						path: "edit/",
						component: EditCoursePage,
						name: "StudentEditCourse",
						props: true,
					},
					{
						path: "announcements/",
						component: CourseAnnouncementsPage,
						name: "StudentCourseAnnouncements",
						props: true,
					},
					{
						path: "assignments/",
						component: CourseAssignmentsPage,
						name: "StudentCourseAssignments",
						props: true,
					},
					{
						path: "syllabus/",
						component: CourseSyllabusPage,
						name: "StudentCourseSyllabus",
						props: true,
					},
				],
			},
		],
	},
];
