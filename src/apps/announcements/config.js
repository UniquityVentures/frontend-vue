// Here we define the headers, filters, and other config
import { formatDate } from "@/services/utils";

export const announcementDefaultHeaders = [
    { title: "Title", key: "title" },
    { title: "Release Date", key: "release_at", formatFunc: formatDate },
    { title: "Expiry Date", key: "expiry_at", formatFunc: formatDate },
    {
        title: "Signed By",
        key: "signed_by_details",
        formatFunc: (signedBy) => signedBy.user_details.full_name,
    },
    { title: "Actions", key: "actions", sortable: false },
];

export const announcementDefaultFilterFields = [
    {
        label: "Search by title",
        type: "string",
        key: "title",
        value: "",
        defaultValue: "",
    },
    {
        label: "Filter by classroom",
        type: "classroom",
        key: "classroom",
        value: null,
    },
    {
        label: "Filter by subject",
        type: "subject",
        key: "subject",
        value: null,
    },
    {
        label: "Filter by signer",
        type: "teacher",
        key: "signed_by",
        value: null,
    },
    {
        label: "Is School Wide",
        type: "n_nary",
        key: "is_school_wide",
        value: null,
        fetchOptions: () => [
            { title: "All Announcements", value: null },
            { title: "School Wide Only", value: "True" },
            { title: "Non-School Wide Only", value: "False" },
        ],
    },
    {
        label: "Is Released",
        type: "boolean",
        key: "is_released",
        value: null,
    },
    {
        label: "Is Expired",
        type: "boolean",
        key: "is_expired",
        value: null,
    },
    {
        label: "Release Date Range",
        type: "dates",
        key: ["released_start", "released_end"],
        value: null,
    },
    {
        label: "Expiry Date Range",
        type: "dates",
        key: ["expired_start", "expired_end"],
        value: null,
    },
];

export const announcementDefaultFormFields = [
    {
        label: "Title",
        key: "title",
        type: "string",
        required: true,
    },
    {
        label: "Description",
        key: "description",
        type: "longstring",
        required: true,
    },
    {
        label: "Priority",
        key: "priority",
        type: "string",
        defaultValue: "low",
    },
    {
        label: "Is Active",
        key: "is_active",
        type: "boolean",
        defaultValue: true,
    },
    {
        label: "Is School Wide",
        key: "is_school_wide",
        type: "boolean",
        defaultValue: false,
    },
    {
        label: "Signed By",
        key: "signed_by",
        type: "teacher",
        required: true,
    },
    {
        label: "Release Date",
        key: "release_at",
        type: "datetime",
        required: true,
    },
    {
        label: "Expiry Date",
        key: "expiry_at",
        type: "datetime",
        required: true,
    },
    {
        label: "Classrooms",
        key: "classrooms",
        type: "classroom",
        multiple: true,
        defaultValue: [],
    },
    {
        label: "Subjects",
        key: "subjects",
        type: "subject",
        multiple: true,
        defaultValue: [],
    },
    {
        label: "Attach File",
        key: "attachments",
        type: "attachment_list",
        defaultValue: null,
    },
];

export const announcementListConfig = {
    primaryField: { key: 'title', default: 'Untitled' },
    secondaryField: { key: 'description', default: 'No description available' },
    chips: [
        { 
            text: (item) => `Signed by: ${item.signed_by_details?.user_details?.full_name || 'Unknown'}`,
            color: 'primary'
        }
    ],
    chipAlignment: 'text-end',
    detailRoute: 'Announcement',
    detailParamKey: 'announcementId',
    viewAllRoute: 'Announcements',
    limit: 3,
    emptyMessage: 'No announcements available'
};
