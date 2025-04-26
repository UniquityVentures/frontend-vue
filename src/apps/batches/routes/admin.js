import { getBatch } from "@/apps/batches/api";
import BatchAnnouncementsPage from "@/apps/batches/views/BatchAnnouncementsPage.vue";
import BatchAttendancePage from "@/apps/batches/views/BatchAttendancePage.vue";
import BatchMarkAttendancePage from "@/apps/batches/views/BatchMarkAttendancePage.vue";
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
			defaultRoute: "AdminBatches",
			description: "View and manage batches",
			getMenu: () => [
				{
					title: "All Batches",
					to: { name: "AdminBatches" },
				},
				{
					title: "Create Batches",
					to: { name: "AdminCreateBatch" },
				},
				{
					title: "Export Batches",
					to: { name: "AdminBatchesExport" },
				},
				{
					title: "Import Batches",
					to: { name: "AdminBatchesImport" },
				},
			],
			icon: "mdi-google-batch",
		},
		children: [
			{
				path: "create/",
				name: "AdminCreateBatch",
				component: CreateBatchPage,
				meta: {
					getDisplayName: () => "Create Batches",
					defaultRoute: "AdminCreateBatch",
				},
			},
			{
				path: "all/",
				name: "AdminBatches",
				component: BatchesPage,
			},
			{
				path: "export/",
				name: "AdminBatchesExport",
				component: BatchesExportPage,
			},
			{
				path: "import/",
				name: "AdminBatchesImport",
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
					defaultRoute: "AdminBatches",
					getMenu: (props) => [
						{
							title: "View Batch",
							to: { name: "AdminBatch", props },
						},
						{
							title: "Edit Batch",
							to: { name: "AdminEditBatch", props },
						},
						{
							title: "Announcements",
							to: { name: "AdminBatchAnnouncements", props },
						},
						{
							title: "Courses",
							to: { name: "AdminBatchCourses", props },
						},
						{
							title: "Teachers",
							to: { name: "AdminBatchTeachers", props },
						},
						{
							title: "Students",
							to: { name: "AdminBatchStudents", props },
						},
						{
							title: "Attendance Records",
							to: { name: "AdminBatchAttendancePage", props },	
						},
						{
							title: "Mark Attendance",
							to: { name: "AdminBatchMarkAttendance", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						props: true,
						name: "AdminBatch",
						component: BatchPage,
					},
					{
						path: "edit/",
						props: true,
						name: "AdminEditBatch",
						component: EditBatchPage,
					},
					{
						path: "announcements/",
						props: true,
						name: "AdminBatchAnnouncements",
						component: BatchAnnouncementsPage,
						meta: {
							getDisplayName: () => "Announcements",
							defaultRoute: "AdminBatchAnnouncements",
						},
					},
					{
						path: "teachers/",
						props: true,
						name: "AdminBatchTeachers",
						component: BatchTeachersPage,
					},
					{
						path: "courses/",
						props: true,
						name: "AdminBatchCourses",
						component: BatchCoursesPage,
					},
					{
						path: "students/",
						props: true,
						name: "AdminBatchStudents",
						component: BatchStudentsPage,
					},
					{
						path: "mark-attendance/",
						props: true,
						name: "AdminBatchMarkAttendance",
						component: BatchMarkAttendancePage,
					},
					{
						path: "attendance/",
						props: true,
						name: "AdminBatchAttendancePage",
						component: BatchAttendancePage,
					},
				],
			},
		],
	},
];
