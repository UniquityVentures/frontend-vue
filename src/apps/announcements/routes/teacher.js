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
			defaultRoute: "TeacherAnnouncements",
			description: "View and manage announcements",
			getMenu: () => [
				{
					title: "All Announcements",
					to: { name: "TeacherAnnouncements" },
				},
				{
					title: "Create Announcement",
					to: { name: "TeacherCreateAnnouncement" },
				},
			],
			icon: "mdi-bullhorn",
		},
		children: [
			{
				path: "all/",
				component: AnnouncementsPage,
				name: "TeacherAnnouncements",
			},
			{
				path: "create/",
				component: CreateAnnouncementPage,
				name: "TeacherCreateAnnouncement",
			},
			{
				path: ":announcementId/",
				component: EmptyLayout,
				props: true,
				meta: {
					defaultRoute: "TeacherAnnouncement",
					getDisplayName: () => "View",
					getMenu: (params) => [
						{
							title: "View Announcement",
							to: { name: "TeacherAnnouncement", params },
						},
						{
							title: "Edit Announcement",
							to: { name: "TeacherEditAnnouncement", params },
						},
					],
					icon: "mdi-bullhorn",
				},
				children: [
					{
						path: "view/",
						component: AnnouncementPage,
						name: "TeacherAnnouncement",
						props: true,
					},
					{
						path: "edit/",
						component: EditAnnouncementPage,
						name: "TeacherEditAnnouncement",
						props: true,
					},
				],
			},
		],
	},
];
