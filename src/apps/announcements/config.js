// Here we define the headers, filters, and other config

export const announcementDefaultHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Release Date", key: "release_at", type: "date" },
    { label: "Expiry Date", key: "expiry_at", type: "date" },
    { label: "Signed By", key: "signed_by_details", type: "teacher" },
];

export const announcementDefaultFilterFields = [
    { label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
    { label: "Filter by batch", type: "batch", key: "batch", value: null },
    { label: "Filter by course", type: "course", key: "course", value: null },
    { label: "Filter by signer", type: "teacher", key: "signed_by", value: null },
    { label: "Is School Wide", type: "n_nary", key: "is_school_wide", value: null, fetchOptions: () => [
        { title: "All Announcements", value: null },
        { title: "School Wide Only", value: "True" },
        { title: "Non-School Wide Only", value: "False" },
    ],
    },
    { label: "Is Released", type: "boolean", key: "is_released", value: null },
    { label: "Is Expired", type: "boolean", key: "is_expired", value: null },
    { label: "Release Date Range", type: "dates", key: ["released_start", "released_end"], value: null },
    { label: "Expiry Date Range", type: "dates", key: ["expired_start", "expired_end"], value: null },
];

export const announcementDefaultFormFields = [
    { label: "Title", type: "string", key: "title", required: true },
    { label: "Description", type: "longstring", key: "description", required: true },
    { label: "Priority", type: "string", key: "priority", defaultValue: "low" },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
    { label: "Is School Wide", type: "boolean", key: "is_school_wide", defaultValue: false },
    { label: "Signed By", type: "teacher", key: "signed_by", required: true },
    { label: "Release Date", type: "datetime", key: "release_at", required: true },
    { label: "Expiry Date", type: "datetime", key: "expiry_at", required: true },
    { label: "Batches", type: "batch", key: "batches", multiple: true, defaultValue: [] },
    { label: "Courses", type: "course", key: "courses", multiple: true, defaultValue: [] },
    { label: "Attach File", type: "attachment_list", key: "attachments", defaultValue: null },
];

export const announcementListConfig = {
    listItemTitle: { key: 'title', default: 'Untitled' },
    listItemSubtitle: { key: 'description', default: 'No description available' },
    listItemChips: [
        { label: 'Signed By', key: 'signed_by_details', color: 'primary', type: 'teacher'}
    ],
    listItemRoute: (item) => ({ name: 'Announcement', params: { announcementId: item.id } }),
    limit: 3,
    emptyMessage: 'No announcements available'
};
