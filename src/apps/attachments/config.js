const attachmentDefaultHeaders = [
	{label: "name", key: "name"},
	// The link refer to something other than an image, might or might not want to handle that as well
	{label: "link", key: "file", type: "image"},
]

const attachmentDefaultFilterFields = [
    {
        label: "Search by name",
        type: "string",
        key: "name",
        value: "",
        defaultValue: "",
    },
    {
        label: "Is Active",
        type: "n_nary",
        key: "is_active",
        fetchOptions: () => [
            { title: "All", value: null },
            { title: "Active", value: "true" },
            { title: "Inactive", value: "false" },
        ],
    },
    {
        label: "Creation Date Range",
        type: "date_range",
        key: ["created_at_start", "created_at_end"],
        value: null,
    },
    {
        label: "Updation Date Range",
        type: "date_range",
        key: ["updated_at_start", "updated_at_end"],
        value: null,
    },
    {
        label: "Filter by additional info",
        type: "string",
        key: "additional_info",
        value: "",
    },
];

export { attachmentDefaultFilterFields, attachmentDefaultHeaders };
