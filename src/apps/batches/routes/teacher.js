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
			defaultRoute: "TeacherBatches",
			description: "View and manage batches",
			getMenu: () => [
				{
					title: "All Batches",
					to: { name: "TeacherBatches" },
				},
				{
					title: "Create Batches",
					to: { name: "TeacherCreateBatch" },
				},
				{
					title: "Export Batches",
					to: { name: "TeacherBatchesExport" },
				},
				{
					title: "Import Batches",
					to: { name: "TeacherBatchesImport" },
				},
			],
			icon: "mdi-google-batch",
		},
		children: [
			{
				path: "create/",
				name: "TeacherCreateBatch",
				component: CreateBatchPage,
				meta: {
					getDisplayName: () => "Create Batches",
					defaultRoute: "TeacherCreateBatch",
				},
			},
			{
				path: "all/",
				name: "TeacherBatches",
				component: BatchesPage,
			},
			{
				path: "export/",
				name: "TeacherBatchesExport",
				component: BatchesExportPage,
			},
			{
				path: "import/",
				name: "TeacherBatchesImport",
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
					defaultRoute: "TeacherBatches",
					getMenu: (props) => [
						{
							title: "View Batch",
							to: { name: "TeacherBatch", props },
						},
						{
							title: "Edit Batch",
							to: { name: "TeacherEditBatch", props },
						},
						{
							title: "Announcements",
							to: { name: "TeacherBatchAnnouncements", props },
						},
						{
							title: "Courses",
							to: { name: "TeacherBatchCourses", props },
						},
						{
							title: "Teachers",
							to: { name: "TeacherBatchTeachers", props },
						},
						{
							title: "Students",
							to: { name: "TeacherBatchStudents", props },
						},
						{
							title: "Attendance Records",
							to: { name: "TeacherBatchAttendancePage", props },	
						},
						{
							title: "Mark Attendance",
							to: { name: "TeacherBatchMarkAttendance", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						props: true,
						name: "TeacherBatch",
						component: BatchPage,
					},
					{
						path: "edit/",
						props: true,
						name: "TeacherEditBatch",
						component: EditBatchPage,
					},
					{
						path: "announcements/",
						props: true,
						name: "TeacherBatchAnnouncements",
						component: BatchAnnouncementsPage,
						meta: {
							getDisplayName: () => "Announcements",
							defaultRoute: "TeacherBatchAnnouncements",
						},
					},
					{
						path: "teachers/",
						props: true,
						name: "TeacherBatchTeachers",
						component: BatchTeachersPage,
					},
					{
						path: "courses/",
						props: true,
						name: "TeacherBatchCourses",
						component: BatchCoursesPage,
					},
					{
						path: "students/",
						props: true,
						name: "TeacherBatchStudents",
						component: BatchStudentsPage,
					},
					{
						path: "mark-attendance/",
						props: true,
						name: "TeacherBatchMarkAttendance",
						component: BatchMarkAttendancePage,
					},
					{
						path: "attendance/",
						props: true,
						name: "TeacherBatchAttendancePage",
						component: BatchAttendancePage,
					},
				],
			},
		],
	},
];
