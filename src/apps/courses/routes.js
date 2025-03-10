import CreateCoursePage from "@/apps/courses/views/CreateCoursePage.vue";
import EditCoursePage from "@/apps/courses/views/EditCoursePage.vue";
import CoursePage from "@/apps/courses/views/CoursePage.vue";
import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import { getCourse } from "./api";
import CourseAssignmentsPage from "./views/CourseAssignmentsPage.vue";
import CoursesPage from "./views/CoursesPage.vue";

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
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "create/",
				name: "CreateCourse",
				component: CreateCoursePage,
				meta: {
					getDisplayName: () => "Create Course",
					defaultRoute: "CreateBatch",
				},
			},
			{
				path: "all/",
				component: CoursesPage,
				name: "Courses",
			},
			{
				path: ":courseId/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "Course",
					getDisplayName: async (props) => {
						const course = await getCourse(props.courseId);
						return `${course.name}`;
					},
					getMenu: (props) => [
						{
							title: "View Course",
							to: { name: "Course", props },
						},
						{
							title: "Edit Course",
							to: { name: "EditCourse", props },
						},
						{
							title: "Assignments",
							to: { name: "CourseAssignments", props },
						},
					],
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
