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
			getDisplayName: () => "Assignments",
			defaultRoute: "AdminAssignments",
			description: "View and manage assignments",
			getMenu: () => [
				{
					title: "All Assignments",
					to: { name: "AdminAssignments" },
				},
				{
					title: "Create Assignment",
					to: { name: "AdminCreateAssignment" },
				},
				{
					title: "Import Assignments",
					to: { name: "AdminImportAssignments" },
				},
				{
					title: "Export Assignments",
					to: { name: "AdminExportAssignments" },
				},
			],
			icon: "mdi-clipboard-text",
		},
		children: [
			{
				path: "",
				component: AssignmentsPage,
				name: "AdminAssignments",
			},
			{
				path: "create/",
				component: CreateAssignmentPage,
				name: "AdminCreateAssignment",
			},
			{
				path: "import/",
				component: AssignmentsImportPage,
				name: "AdminImportAssignments",
			},
			{
				path: "export/",
				component: AssignmentsExportPage,
				name: "AdminExportAssignments",
			},
			{
				path: ":assignmentId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "AdminAssignment",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Assignment",
							to: { name: "AdminAssignment", params },
						},
						{
							title: "Edit Assignment",
							to: { name: "AdminEditAssignment", params },
						},
					],
					icon: "mdi-clipboard-text",
				},
				children: [
					{
						path: "",
						component: AssignmentPage,
						name: "AdminAssignment",
						props: true,
					},
					{
						path: "edit/",
						component: EditAssignmentPage,
						name: "AdminEditAssignment",
						props: true,
					},
				],
			},
		],
	},
];
