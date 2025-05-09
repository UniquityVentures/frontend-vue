import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { getCourse } from "../api";
import CoursePage from "../views/CoursePage.vue";
import CourseAnnouncementsPage from "../views/CourseAnnouncementsPage.vue";
import CourseAssignmentsPage from "../views/CourseAssignmentsPage.vue";
import CourseSyllabusPage from "../views/CourseSyllabusPage.vue";
import CoursesPage from "../views/CoursesPage.vue";

export default [
	{
		path: "courses/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Courses",
			defaultRoute: "Courses",
			description: "View your courses",
			getMenu: () => [
				{
					title: "My Courses",
					to: { name: "Courses" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "all/",
				component: CoursesPage,
				name: "Courses",
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
							title: "Announcements",
							to: { name: "CourseAnnouncements", params },
						},
						{
							title: "Assignments",
							to: { name: "CourseAssignments", params },
						},
						{
							title: "Syllabus",
							to: { name: "CourseSyllabus", params },
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
					{
						path: "syllabus/",
						component: CourseSyllabusPage,
						name: "CourseSyllabus",
						props: true,
					},
				],
			},
		],
	},
];
