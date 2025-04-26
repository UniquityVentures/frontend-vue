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
			defaultRoute: "AdminCourses",
			description: "View and manage courses",
			getMenu: () => [
				{
					title: "All Courses",
					to: { name: "AdminCourses" },
				},
				{
					title: "Create Course",
					to: { name: "AdminCreateCourse" },
				},
				{
					title: "Import Courses",
					to: { name: "AdminImportCourses" },
				},
				{
					title: "Export Courses",
					to: { name: "AdminExportCourses" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "all/",
				component: CoursesPage,
				name: "AdminCourses",
			},
			{
				path: "create/",
				component: CreateCoursePage,
				name: "AdminCreateCourse",
			},
			{
				path: "import/",
				component: CoursesImportPage,
				name: "AdminImportCourses",
			},
			{
				path: "export/",
				component: CoursesExportPage,
				name: "AdminExportCourses",
			},
			{
				path: ":courseId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "AdminCourse",
					getDisplayName: async (props) => {
						const course = await getCourse(props.courseId);
						return `${course.name} (${course.code})`;
					},
					getMenu: (params) => [
						{
							title: "View Course",
							to: { name: "AdminCourse", params },
						},
						{
							title: "Edit Course",
							to: { name: "AdminEditCourse", params },
						},
						{
							title: "Announcements",
							to: { name: "AdminCourseAnnouncements", params },
						},
						{
							title: "Assignments",
							to: { name: "AdminCourseAssignments", params },
						},
						{
							title: "Syllabus",
							to: { name: "AdminCourseSyllabus", params },
						},
					],
					icon: "mdi-book-open-variant",
				},
				children: [
					{
						path: "view/",
						component: CoursePage,
						name: "AdminCourse",
						props: true,
					},
					{
						path: "edit/",
						component: EditCoursePage,
						name: "AdminEditCourse",
						props: true,
					},
					{
						path: "announcements/",
						component: CourseAnnouncementsPage,
						name: "AdminCourseAnnouncements",
						props: true,
					},
					{
						path: "assignments/",
						component: CourseAssignmentsPage,
						name: "AdminCourseAssignments",
						props: true,
					},
					{
						path: "syllabus/",
						component: CourseSyllabusPage,
						name: "AdminCourseSyllabus",
						props: true,
					},
				],
			},
		],
	},
];
