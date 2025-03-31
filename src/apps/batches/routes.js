import { getBatch } from "@/apps/batches/api";
import BatchAnnouncementsPage from "@/apps/batches/views/BatchAnnouncementsPage.vue";
import BatchCoursesPage from "@/apps/batches/views/BatchCoursesPage.vue";
import BatchPage from "@/apps/batches/views/BatchPage.vue";
import BatchStudentsPage from "@/apps/batches/views/BatchStudentsPage.vue";
import BatchTeachersPage from "@/apps/batches/views/BatchTeachersPage.vue";
import BatchesExportPage from "@/apps/batches/views/BatchesExportPage.vue";
import BatchesImportPage from "@/apps/batches/views/BatchesImportPage.vue";
import BatchesPage from "@/apps/batches/views/BatchesPage.vue";
import CreateBatchPage from "@/apps/batches/views/CreateBatchPage.vue";
import EditBatchPage from "@/apps/batches/views/EditBatchPage.vue";
import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default [
	{
		path: "batches/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Batches",
			defaultRoute: "Batches",
			description: "View and manage batches",
			getMenu: () => [
				{
					title: "All Batches",
					to: { name: "Batches" },
				},
				{
					title: "Create Batches",
					to: { name: "CreateBatch" },
				},
				{
					title: "Export Batches",
					to: { name: "BatchesExport" },
				},
				{
					title: "Import Batches",
					to: { name: "BatchesImport" },
				},
			],
			icon: "mdi-google-batch",
		},
		children: [
			{
				path: "create/",
				name: "CreateBatch",
				component: CreateBatchPage,
				meta: {
					getDisplayName: () => "Create Batches",
					defaultRoute: "CreateBatch",
				},
			},
			{
				path: "all/",
				name: "Batches",
				component: BatchesPage,
			},
			{
				path: "export/",
				name: "BatchesExport",
				component: BatchesExportPage,
			},
			{
				path: "import/",
				name: "BatchesImport",
				component: BatchesImportPage,
			},
			{
				path: ":batchId/",
				props: true,
				component: EmptyLayout,
				meta: {
					getDisplayName: async (props) => {
						if (props?.batchId) {
							const batch = await getBatch(props.batchId);
							return batch.name;
						}
						return "Batches";
					},
					defaultRoute: "Batches",
					getMenu: (props) => [
						{
							title: "View Batch",
							to: { name: "Batch", props },
						},
						{
							title: "Edit Batch",
							to: { name: "EditBatch", props },
						},
						{
							title: "Announcements",
							to: { name: "BatchAnnouncements", props },
						},
						{
							title: "Courses",
							to: { name: "BatchCourses", props },
						},
						{
							title: "Teachers",
							to: { name: "BatchTeachers", props },
						},
						{
							title: "Students",
							to: { name: "BatchStudents", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						props: true,
						name: "Batch",
						component: BatchPage,
					},
					{
						path: "edit/",
						props: true,
						name: "EditBatch",
						component: EditBatchPage,
					},
					{
						path: "announcements/",
						props: true,
						name: "BatchAnnouncements",
						component: BatchAnnouncementsPage,
						meta: {
							getDisplayName: () => "Announcements",
							defaultRoute: "BatchAnnouncements",
						},
					},
					{
						path: "teachers/",
						props: true,
						name: "BatchTeachers",
						component: BatchTeachersPage,
					},
					{
						path: "courses/",
						props: true,
						name: "BatchCourses",
						component: BatchCoursesPage,
					},
					{
						path: "students/",
						props: true,
						name: "BatchStudents",
						component: BatchStudentsPage,
					},
				],
			},
		],
	},
];
