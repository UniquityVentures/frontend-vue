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
			defaultRoute: "AdminAnnouncements",
			description: "View and manage announcements",
			getMenu: () => [
				{
					title: "All Announcements",
					to: { name: "AdminAnnouncements" },
				},
				{
					title: "Create Announcement",
					to: { name: "AdminCreateAnnouncement" },
				},
			],
			icon: "mdi-bullhorn",
		},
		children: [
			{
				path: "all/",
				component: AnnouncementsPage,
				name: "AdminAnnouncements",
			},
			{
				path: "create/",
				component: CreateAnnouncementPage,
				name: "AdminCreateAnnouncement",
			},
			{
				path: ":announcementId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "AdminAnnouncement",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Announcement",
							to: { name: "AdminAnnouncement", params },
						},
						{
							title: "Edit Announcement",
							to: { name: "AdminEditAnnouncement", params },
						},
					],
					icon: "mdi-bullhorn",
				},
				children: [
					{
						path: "view/",
						component: AnnouncementPage,
						name: "AdminAnnouncement",
						props: true,
					},
					{
						path: "edit/",
						component: EditAnnouncementPage,
						name: "AdminEditAnnouncement",
						props: true,
					},
				],
			},
		],
	},
];
