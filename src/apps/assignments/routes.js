import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AssignmentPage from "./views/AssignmentPage.vue";
import AssignmentsExportPage from "./views/AssignmentsExportPage.vue";
import AssignmentsImportPage from "./views/AssignmentsImportPage.vue";
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
				{
					title: "Import Assignments",
					to: { name: "ImportAssignments" },
				},
				{
					title: "Export Assignments",
					to: { name: "ExportAssignments" },
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
				name: "CreateAssignment",
			},
			{
				path: "import/",
				component: AssignmentsImportPage,
				name: "ImportAssignments",
			},
			{
				path: "export/",
				component: AssignmentsExportPage,
				name: "ExportAssignments",
			},
			{
				path: ":assignmentId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "Assignment",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Assignment",
							to: { name: "Assignment", params },
						},
						{
							title: "Edit Assignment",
							to: { name: "EditAssignment", params },
						},
					],
					icon: "mdi-clipboard-text",
				},
				children: [
					{
						path: "",
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
