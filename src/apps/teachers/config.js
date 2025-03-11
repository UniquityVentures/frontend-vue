export const teacherDefaultFilterFields = [
	{ label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
	{ label: "Filter by batch", type: "batch", key: "batches", value: null },
	{ label: "Filter by course", type: "course", key: "courses", value: null },
];

export const teacherDefaultHeaders = [
	{ label: "Name", key: "user_details.full_name" },
	{ label: "Teacher Id", key: "identifier" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "user_details.email" },
];