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
			defaultRoute: "TeacherAssignments",
			description: "View and manage assignments",
			getMenu: () => [
				{
					title: "All Assignments",
					to: { name: "TeacherAssignments" },
				},
				{
					title: "Create Assignment",
					to: { name: "TeacherCreateAssignment" },
				},
				{
					title: "Import Assignments",
					to: { name: "TeacherImportAssignments" },
				},
				{
					title: "Export Assignments",
					to: { name: "TeacherExportAssignments" },
				},
			],
			icon: "mdi-clipboard-text",
		},
		children: [
			{
				path: "",
				component: AssignmentsPage,
				name: "TeacherAssignments",
			},
			{
				path: "create/",
				component: CreateAssignmentPage,
				name: "TeacherCreateAssignment",
			},
			{
				path: "import/",
				component: AssignmentsImportPage,
				name: "TeacherImportAssignments",
			},
			{
				path: "export/",
				component: AssignmentsExportPage,
				name: "TeacherExportAssignments",
			},
			{
				path: ":assignmentId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "TeacherAssignment",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Assignment",
							to: { name: "TeacherAssignment", params },
						},
						{
							title: "Edit Assignment",
							to: { name: "TeacherEditAssignment", params },
						},
					],
					icon: "mdi-clipboard-text",
				},
				children: [
					{
						path: "",
						component: AssignmentPage,
						name: "TeacherAssignment",
						props: true,
					},
					{
						path: "edit/",
						component: EditAssignmentPage,
						name: "TeacherEditAssignment",
						props: true,
					},
				],
			},
		],
	},
];
