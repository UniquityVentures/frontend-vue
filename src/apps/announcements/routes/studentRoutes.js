import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import NoticeBoardPage from "@/apps/announcements/views/NoticeBoardPage.vue";
import AnnouncementPage from "@/apps/announcements/views/AnnouncementPage.vue";

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
                component: NoticeBoardPage,
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
                        component: AnnouncementPage,
                        name: "Announcement",
                        props: true,
                    },
                ],
            },
        ],
    },
];