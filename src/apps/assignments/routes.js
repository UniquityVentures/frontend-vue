import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AssignmentPage from "./views/AssignmentPage.vue";
import AssignmentsPage from "./views/AssignmentsPage.vue";
import CreateAssignmentPage from "./views/CreateAssignmentPage.vue";
import EditAssignmentPage from "./views/EditAssignmentPage.vue";

export default [
	{
		path: "assignments/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Assignments",
			defaultRoute: "Assignments",
			description: "View and manage assignments",
			getMenu: () => [
				{
					title: "All Assignments",
					to: { name: "Assignments" },
				},
				{
					title: "Create Assignment",
					to: { name: "CreateAssignment" },
				},
			],
			icon: "mdi-clipboard-text",
		},
		children: [
			{
				path: "all/",
				component: AssignmentsPage,
				name: "Assignments",
			},
			{
				path: "create/",
				component: CreateAssignmentPage,
				name: "CreateAssignment",
			},
			{
				path: ":assignmentId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "Assignment",
					getDisplayName: () => "View",
					getMenu: (props) => [
						{
							title: "View Assignment",
							to: { name: "Assignment", props },
						},
						{
							title: "Edit Assignment",
							to: { name: "EditAssignment", props },
						},
					],
					icon: "mdi-clipboard-text",
				},
				children: [
					{
						path: "view/",
						component: AssignmentPage,
						name: "Assignment",
						props: true,
					},
					{
						path: "edit/",
						component: EditAssignmentPage,
						name: "EditAssignment",
						props: true,
					},
				],
			},
		],
	},
];
