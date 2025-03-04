import ClassroomAnnouncementsPage from "@/apps/classrooms/views/ClassroomAnnouncementsPage.vue";
import ClassroomPage from "@/apps/classrooms/views/ClassroomPage.vue";
import ClassroomsExportPage from "@/apps/classrooms/views/ClassroomsExportPage.vue";
import ClassroomsImportPage from "@/apps/classrooms/views/ClassroomsImportPage.vue";
import ClassroomsPage from "@/apps/classrooms/views/ClassroomsPage.vue";
import CreateClassroomPage from "@/apps/classrooms/views/CreateClassroomPage.vue";
import EditClassroomPage from "@/apps/classrooms/views/EditClassroomPage.vue";
import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { getClassroom } from "@/apps/classrooms/api";
import subjectsRoutes from "@/apps/subjects/routes";
export default [
	{
		path: "classrooms/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Classes",
			defaultRoute: "Classrooms",
			description: "View and manage classrooms",
			getMenu: () => [
				{
					title: "All Classrooms",
					to: { name: "Classrooms" },
				},
				{
					title: "Create Classrooms",
					to: { name: "CreateClassroom" },
				},
				{
					title: "Export Classrooms",
					to: { name: "ClassroomsExport" },
				},
				{
					title: "Import Classrooms",
					to: { name: "ClassroomsImport" },
				},
			],
			icon: "mdi-google-classroom",
		},
		children: [
			{
				path: "create/",
				name: "CreateClassroom",
				component: CreateClassroomPage,
				meta: {
					getDisplayName: () => "Create Classrooms",
					defaultRoute: "CreateClassroom",
				},
			},
			{
				path: "all/",
				name: "Classrooms",
				component: ClassroomsPage,
			},
			{
				path: "export/",
				name: "ClassroomsExport",
				component: ClassroomsExportPage,
			},
			{
				path: "import/",
				name: "ClassroomsImport",
				component: ClassroomsImportPage,
			},
			{
				path: ":classroomId/",
				props: true,
				component: EmptyLayout,
				meta: {
					getDisplayName: async (props) => {
						if (props?.classroomId) {
							const classroom = await getClassroom(props.classroomId);
							return classroom.name;
						}
						return "Classrooms";
					},
					defaultRoute: "Classrooms",
					getMenu: (props) => [
						{
							title: "View Classroom",
							to: { name: "Classroom", props },
						},
						{
							title: "Edit Classroom",
							to: { name: "EditClassroom", props },
						},
						{
							title: "Announcements",
							to: { name: "ClassroomAnnouncements", props },
						},
						{
							title: "Subjects",
							to: { name: "Subjects", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						props: true,
						name: "Classroom",
						component: ClassroomPage,
					},
					{
						path: "edit/",
						props: true,
						name: "EditClassroom",
						component: EditClassroomPage,
					},
					{
						path: "announcements/",
						props: true,
						name: "ClassroomAnnouncements",
						component: ClassroomAnnouncementsPage,
						meta: {
							getDisplayName: () => "Announcements",
							defaultRoute: "ClassroomAnnouncements",
						},
					},
					...subjectsRoutes,
				],
			},
		],
	},
];
