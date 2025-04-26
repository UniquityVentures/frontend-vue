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
			getDisplayName: () => "Attachments",
			defaultRoute: "AdminAttachments",
			description: "View and manage attachments",
			getMenu: (props) => [
				{
					title: "View Attachments",
					to: { name: "AdminAttachments", params: props },
				},
			],
			icon: "mdi-paperclip",
		},
		children: [
			{
				path: "all/",
				component: AttachmentsPage,
				name: "AdminAttachments",
			},
			{
				path: ":attachmentId",
				props: true,
				component: AttachmentPage,
				meta: {
					defaultRoute: "AdminAttachment",
					getDisplayName: async (params) =>
						(await api.get(`api/attachments/${params.attachmentId}/`)).data
							.name,
					getMenu: (props) => [
						{
							title: "View Attachment",
							to: { name: "AdminAttachment", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: EmptyLayout,
						name: "AdminAttachment",
						props: true,
					},
					{
						path: "edit/",
						component: EmptyLayout,
						name: "AdminEditAttachment",
						props: true,
					},
				],
			},
		],
	},
];
