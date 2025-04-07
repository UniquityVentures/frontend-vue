import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

import AnnouncementPage from "@/apps/announcements/views/AnnouncementPage.vue";
import AnnouncementsPage from "@/apps/announcements/views/AnnouncementsPage.vue";
import CreateAnnouncementPage from "@/apps/announcements/views/CreateAnnouncementPage.vue";
import EditAnnouncementPage from "@/apps/announcements/views/EditAnnouncementPage.vue";

export default [
	{
		path: "announcements/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Announcements",
			defaultRoute: "Announcements",
			description: "View and manage announcements",
			getMenu: () => [
				{
					title: "All Announcements",
					to: { name: "Announcements" },
				},
				{
					title: "Create Announcement",
					to: { name: "CreateAnnouncement" },
				},
			],
			icon: "mdi-bullhorn",
		},
		children: [
			{
				path: "all/",
				component: AnnouncementsPage,
				name: "Announcements",
			},
			{
				path: "create/",
				component: CreateAnnouncementPage,
				name: "CreateAnnouncement",
			},
			{
				path: ":announcementId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "Announcement",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Announcement",
							to: { name: "Announcement", params },
						},
						{
							title: "Edit Announcement",
							to: { name: "EditAnnouncement", params },
						},
					],
					icon: "mdi-bullhorn",
				},
				children: [
					{
						path: "view/",
						component: AnnouncementPage,
						name: "Announcement",
						props: true,
					},
					{
						path: "edit/",
						component: EditAnnouncementPage,
						name: "EditAnnouncement",
						props: true,
					},
				],
			},
		],
	},
];
