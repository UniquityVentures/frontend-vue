import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

import { getCourse } from "./api";
import CoursePage from "./views/CoursePage.vue";
import CoursesExportPage from "./views/CoursesExportPage.vue";
import CoursesImportPage from "./views/CoursesImportPage.vue";
import CoursesPage from "./views/CoursesPage.vue";
import CreateCoursePage from "./views/CreateCoursePage.vue";
import EditCoursePage from "./views/EditCoursePage.vue";
import CourseAnnouncementsPage from "./views/CourseAnnouncementsPage.vue";
import CourseAssignmentsPage from "./views/CourseAssignmentsPage.vue";

export default [
	{
		path: "courses/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Courses",
			defaultRoute: "Courses",
			description: "View and manage courses",
			getMenu: () => [
				{
					title: "All Courses",
					to: { name: "Courses" },
				},
				{
					title: "Create Course",
					to: { name: "CreateCourse" },
				},
				{
					title: "Import Courses",
					to: { name: "ImportCourses" },
				},
				{
					title: "Export Courses",
					to: { name: "ExportCourses" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "",
				component: CoursesPage,
				name: "Courses",
			},
			{
				path: "create/",
				component: CreateCoursePage,
				name: "CreateCourse",
			},
			{
				path: "import/",
				component: CoursesImportPage,
				name: "ImportCourses",
			},
			{
				path: "export/",
				component: CoursesExportPage,
				name: "ExportCourses",
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
							to: { name: "Course", params },
						},
						{
							title: "Edit Course",
							to: { name: "EditCourse", params },
						},
						{
							title: "Announcements",
							to: { name: "CourseAnnouncements", params },
						},
						{
							title: "Assignments",
							to: { name: "CourseAssignments", params },
						},
					],
					icon: "mdi-book-open-variant",
				},
				children: [
					{
						path: "view/",
						component: CoursePage,
						name: "Course",
						props: true,
					},
					{
						path: "edit/",
						component: EditCoursePage,
						name: "EditCourse",
						props: true,
					},
					{
						path: "announcements/",
						component: CourseAnnouncementsPage,
						name: "CourseAnnouncements",
						props: true,
					},
					{
						path: "assignments/",
						component: CourseAssignmentsPage,
						name: "CourseAssignments",
						props: true,
					},
				],
			},
		],
	},
];
