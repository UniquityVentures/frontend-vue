import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AssignmentPage from "../views/AssignmentPage.vue";
import AssignmentsExportPage from "../views/AssignmentsExportPage.vue";
import AssignmentsImportPage from "../views/AssignmentsImportPage.vue";
import AssignmentsPage from "../views/AssignmentsPage.vue";
import CreateAssignmentPage from "../views/CreateAssignmentPage.vue";
import EditAssignmentPage from "../views/EditAssignmentPage.vue";

export default [
	{
		path: "assignments/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "StudentAssignments",
			defaultRoute: "StudentAssignments",
			description: "View and manage assignments",
			getMenu: () => [
				{
					title: "All Assignments",
					to: { name: "StudentAssignments" },
				},
				{
					title: "Create Assignment",
					to: { name: "StudentCreateAssignment" },
				},
				{
					title: "Import Assignments",
					to: { name: "StudentImportAssignments" },
				},
				{
					title: "Export Assignments",
					to: { name: "StudentExportAssignments" },
				},
			],
			icon: "mdi-clipboard-text",
		},
		children: [
			{
				path: "",
				component: AssignmentsPage,
				name: "Assignments",
			},
			{
				path: "create/",
				component: CreateAssignmentPage,
				name: "StudentCreateAssignment",
			},
			{
				path: "import/",
				component: AssignmentsImportPage,
				name: "StudentImportAssignments",
			},
			{
				path: "export/",
				component: AssignmentsExportPage,
				name: "StudentExportAssignments",
			},
			{
				path: ":assignmentId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "StudentAssignment",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Assignment",
							to: { name: "StudentAssignment", params },
						},
						{
							title: "Edit Assignment",
							to: { name: "StudentEditAssignment", params },
						},
					],
					icon: "mdi-clipboard-text",
				},
				children: [
					{
						path: "",
						component: AssignmentPage,
						name: "StudentAssignment",
						props: true,
					},
					{
						path: "edit/",
						component: EditAssignmentPage,
						name: "StudentEditAssignment",
						props: true,
					},
				],
			},
		],
	},
];
