import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import StudentAnnouncementsPage from "@/apps/announcements/views/StudentAnnouncementsPage.vue";
import StudentAnnouncementPage from "@/apps/announcements/views/StudentAnnouncementPage.vue";
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
            ],
            icon: "mdi-bullhorn",
        },
        children: [
            {
                path: "all/",
                component: StudentAnnouncementsPage,
                name: "Announcements",
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
                    ],
                },
                children: [
                    {
                        path: "view/",
                        component: StudentAnnouncementPage,
                        name: "Announcement",
                        props: true,
                    },
                ],
            },
        ],
    },
];