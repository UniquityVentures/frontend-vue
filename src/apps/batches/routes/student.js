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
			defaultRoute: "StudentBatches",
			description: "View and manage batches",
			getMenu: () => [
				{
					title: "All Batches",
					to: { name: "StudentBatches" },
				},
				{
					title: "Create Batches",
					to: { name: "StudentCreateBatch" },
				},
				{
					title: "Export Batches",
					to: { name: "StudentBatchesExport" },
				},
				{
					title: "Import Batches",
					to: { name: "StudentBatchesImport" },
				},
			],
			icon: "mdi-google-batch",
		},
		children: [
			{
				path: "create/",
				name: "StudentCreateBatch",
				component: CreateBatchPage,
				meta: {
					getDisplayName: () => "Create Batches",
					defaultRoute: "StudentCreateBatch",
				},
			},
			{
				path: "all/",
				name: "StudentBatches",
				component: BatchesPage,
			},
			{
				path: "export/",
				name: "StudentBatchesExport",
				component: BatchesExportPage,
			},
			{
				path: "import/",
				name: "StudentBatchesImport",
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
					defaultRoute: "StudentBatches",
					getMenu: (props) => [
						{
							title: "View Batch",
							to: { name: "StudentBatch", props },
						},
						{
							title: "Edit Batch",
							to: { name: "StudentEditBatch", props },
						},
						{
							title: "Announcements",
							to: { name: "StudentBatchAnnouncements", props },
						},
						{
							title: "Courses",
							to: { name: "StudentBatchCourses", props },
						},
						{
							title: "Teachers",
							to: { name: "StudentBatchTeachers", props },
						},
						{
							title: "Students",
							to: { name: "StudentBatchStudents", props },
						},
						{
							title: "Attendance Records",
							to: { name: "StudentBatchAttendancePage", props },	
						},
						{
							title: "Mark Attendance",
							to: { name: "StudentBatchMarkAttendance", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						props: true,
						name: "StudentBatch",
						component: BatchPage,
					},
					{
						path: "edit/",
						props: true,
						name: "StudentEditBatch",
						component: EditBatchPage,
					},
					{
						path: "announcements/",
						props: true,
						name: "StudentBatchAnnouncements",
						component: BatchAnnouncementsPage,
						meta: {
							getDisplayName: () => "Announcements",
							defaultRoute: "BatchAnnouncements",
						},
					},
					{
						path: "teachers/",
						props: true,
						name: "StudentBatchTeachers",
						component: BatchTeachersPage,
					},
					{
						path: "courses/",
						props: true,
						name: "StudentBatchCourses",
						component: BatchCoursesPage,
					},
					{
						path: "students/",
						props: true,
						name: "StudentBatchStudents",
						component: BatchStudentsPage,
					},
					{
						path: "mark-attendance/",
						props: true,
						name: "StudentBatchMarkAttendance",
						component: BatchMarkAttendancePage,
					},
					{
						path: "attendance/",
						props: true,
						name: "StudentBatchAttendancePage",
						component: BatchAttendancePage,
					},
				],
			},
		],
	},
];
