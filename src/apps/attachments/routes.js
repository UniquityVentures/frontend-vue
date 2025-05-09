import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import AttachmentPage from "./views/AttachmentPage.vue";
import AttachmentsMasterPage from "./views/AttachmentsMasterPage.vue";

export default [
	{
		path: "attachments/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Attachments",
			defaultRoute: "AttachmentsMaster",
			description: "View and manage attachments",
			getMenu: (props) => [
				{
					title: "Attachments Master",
					to: { name: "AttachmentsMaster", params: props },
				},
			],
			icon: "mdi-paperclip",
		},
		children: [
			{
				path: "master/",
				component: AttachmentsMasterPage,
				name: "AttachmentsMaster",
			},
			{
				path: ":attachmentId/",
				props: true,
				component: AttachmentPage,
				meta: {
					defaultRoute: "Attachment",
					getDisplayName: "Attachment Object",
					getMenu: (props) => [
						{
							title: "View Attachment",
							to: { name: "Attachment", params: props },
						},
					],
				},
				children: [
					{
						path: "view/",
						component: EmptyLayout,
						name: "Attachment",
						props: true,
					},
					{
						path: "edit/",
						component: EmptyLayout,
						name: "EditAttachment",
						props: true,
					},
				],
			},
		],
	},
];
