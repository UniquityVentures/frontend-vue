import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import AttachmentPage from "../views/AttachmentPage.vue";
import AttachmentsPage from "../views/AttachmentsPage.vue";

export default [
	{
		path: "attachments/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "TeacherAttachments",
			defaultRoute: "TeacherAttachments",
			description: "View and manage attachments",
			getMenu: (props) => [
				{
					title: "View Attachments",
					to: { name: "TeacherAttachments", params: props },
				},
			],
			icon: "mdi-paperclip",
		},
		children: [
			{
				path: "all/",
				component: AttachmentsPage,
				name: "TeacherAttachments",
			},
			{
				path: ":attachmentId",
				props: true,
				component: AttachmentPage,
				meta: {
					defaultRoute: "TeacherAttachment",
					getDisplayName: async (params) =>
						(await api.get(`api/attachments/${params.attachmentId}/`)).data
							.name,
					getMenu: (props) => [
						{
							title: "View Attachment",
							to: { name: "TeacherAttachment", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: EmptyLayout,
						name: "TeacherAttachment",
						props: true,
					},
					{
						path: "edit/",
						component: EmptyLayout,
						name: "TeacherEditAttachment",
						props: true,
					},
				],
			},
		],
	},
];
