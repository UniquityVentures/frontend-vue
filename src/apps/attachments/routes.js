import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import CreateAttachmentPage from "./views/CreateAttachmentPage.vue";
import AttachmentsPage from "./views/AttachmentsPage.vue";
import AttachmentPage from "./views/AttachmentPage.vue";

export default [
    {
        path: "attachments/",
        component: AppSideBarBreadcrumbsLayout,
        meta: {
            requiresAuth: true,
            getDisplayName: () => "Attachments",
            defaultRoute: "Attachments",
            description: "View and manage attachments",
            getMenu: (props) => [
                {
                    title: "View Attachments",
                    to: { name: "Attachments", params: props },
                },
                {
                    title: "Create Attachments",
                    to: { name: "CreateAttachment", params: props },
                },
            ],
            icon: "mdi-paperclip",
        },
        children: [
            {
                path: "create/",
                name: "CreateAttachment",
                component: CreateAttachmentPage,
                meta: {
                    getDisplayName: () => "Create Attachment",
                    defaultRoute: "CreateAttachment",
                },
            },
            {
                path: "",
                component: AttachmentsPage,
                name: "Attachments",
            },
            {
                path: ":attachmentId",
                props: true,
                component: AttachmentPage,
                meta: {
                    defaultRoute: "Attachment",
                    getDisplayName: async (params) =>
                        (await api.get(`api/attachments/${params.attachmentId}/`)).data
                            .name,
                    getMenu: (props) => [
                        {
                            title: "View Attachment",
                            to: { name: "Attachment", params: props },
                        },
                    ],
                },
                children: [
                    {
                        path: "",
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
