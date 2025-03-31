import { formatDateTime } from "@/services/utils";

export const eventDefaultFilterFields = [
	{
		label: "Search by title",
		type: "string",
		key: "title",
		value: "",
		defaultValue: "",
	},
	{ label: "Filter by batch", type: "batch", key: "batch", value: null },
	{ label: "Filter by course", type: "course", key: "course", value: null },
	{
		label: "Filter by creator",
		type: "teacher",
		key: "created_by",
		value: null,
	},
	{
		label: "Is School Wide",
		type: "n_nary",
		key: "is_school_wide",
		value: null,
		fetchOptions: () => [
			{ title: "All Events", value: null },
			{ title: "School Wide Only", value: "True" },
			{ title: "Non-School Wide Only", value: "False" },
		],
	},
	{ label: "Date Range", type: "dates", key: ["start", "end"], value: null },
];

export const eventDefaultHeaders = [
	{ label: "Title", key: "title" },
	{ label: "Description", key: "description", type: "longstring" },
	{ label: "Start", key: "start", formatFunc: formatDateTime },
	{ label: "End", key: "end", formatFunc: formatDateTime },
];
