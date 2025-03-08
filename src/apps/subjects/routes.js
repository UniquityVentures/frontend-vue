import CreateSubjectPage from "@/apps/subjects/views/CreateSubjectPage.vue";
import EditSubjectPage from "@/apps/subjects/views/EditSubjectPage.vue";
import SubjectPage from "@/apps/subjects/views/SubjectPage.vue";
import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import { getSubject } from "./api";
import SubjectAssignmentsPage from "./views/SubjectAssignmentsPage.vue";
import ClassroomSubjectsPage from "./views/ClassroomSubjectsPage.vue";
export default [
	{
		path: "subjects/",
		component: EmptyLayout,
		props: true,
		meta: {
			getDisplayName: () => "Subjects",
			defaultRoute: "Subjects",
			description: "View and manage subjects",
			getMenu: () => [
				{
					title: "All Subjects",
					to: { name: "Subjects" },
				},
				{
					title: "Create Subject",
					to: { name: "CreateSubject" },
				},
			],
			icon: "mdi-book-open-variant",
		},
		children: [
			{
				path: "create/",
				name: "CreateSubject",
				props: true,
				component: CreateSubjectPage,
				meta: {
					getDisplayName: () => "Create Subject",
					defaultRoute: "CreateClassroom",
				},
			},
			{
				path: "all/",
				props: true,
				component: ClassroomSubjectsPage,
				name: "Subjects",
			},
			{
				path: ":subjectId/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "Subject",
					getDisplayName: async (props) => {
						const subject = await getSubject(props.subjectId);
						return `${subject.name} [${subject.classroom_details.name}]`;
					},
					getMenu: (props) => [
						{
							title: "View Subject",
							to: { name: "Subject", props },
						},
						{
							title: "Edit Subject",
							to: { name: "EditSubject", props },
						},
						{
							title: "Assignments",
							to: { name: "SubjectAssignments", props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: SubjectPage,
						name: "Subject",
						props: true,
					},
					{
						path: "edit/",
						component: EditSubjectPage,
						name: "EditSubject",
						props: true,
					},
					{
						path: "assignments/",
						component: SubjectAssignmentsPage,
						name: "SubjectAssignments",
						props: true,
					},
				],
			},
		],
	},
];
