import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import StudentAnnouncementsPage from "@/apps/announcements/views/StudentAnnouncementsPage.vue";
import AnnouncementPage from "@/apps/announcements/views/AnnouncementPage.vue";

export default [
    {
        path: "announcements/",
        component: AppSideBarBreadcrumbsLayout,
        meta: {
            getDisplayName: () => "Announcements",
            defaultRoute: "StudentAnnouncements",
            description: "View and manage announcements",
            getMenu: () => [
                {
                    title: "All Announcements",
                    to: { name: "StudentAnnouncements" },
                },
            ],
            icon: "mdi-bullhorn",
        },
        children: [
            {
                path: "all/",
                component: StudentAnnouncementsPage,
                name: "StudentAnnouncements",
            },
            {
                path: ":announcementId/",
                component: EmptyLayout,
                props: true,
                meta: {
                    defaultRoute: "StudentAnnouncement",
                    getDisplayName: () => "View",
                    getMenu: (params) => [
                        {
                            title: "View Announcement",
                            to: { name: "StudentAnnouncement", params },
                        },
                    ],
                },
                children: [
                    {
                        path: "view/",
                        component: AnnouncementPage,
                        name: "StudentAnnouncement",
                        props: true,
                    },
                ],
            },
        ],
    },
];
