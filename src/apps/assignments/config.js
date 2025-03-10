import { formatDate } from "@/services/utils";

export const assignmentDefaultFilterFields = [
	{ label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
	{ label: "Search by description", type: "string", key: "description", value: "", defaultValue: "" },
	{ label: "Filter by course", type: "course", key: "course", value: null },
	{ label: "Filter by active", type: "n_nary", key: "is_active", value: null, fetchOptions: () => [
			{ title: "Active", value: true },
			{ title: "Inactive", value: false },
			{ title: "All", value: null },
		],
	},
];

export const assignmentDefaultHeaders = [
	{ title: "Title", key: "title" },
	{ title: "Release Date", key: "release_at", type: "date" },
	{ title: "Due Date", key: "due_at", type: "date" },
	{ title: "Course", key: "course_details", type: "course" },
];

export const assignmentDefaultFormFields = [
	{ label: "Title", type: "string", key: "title", required: true },
	{ label: "Description", type: "longstring", key: "description", required: true },
	{ label: "Course", type: "course", key: "course", required: true },
	{ label: "Release Date", type: "datetime", key: "release_at", required: true },
	{ label: "Expiry Date", type: "datetime", key: "expiry_at", required: true },
	{ label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
];

export const assignmentListConfig = {
	listItemTitle: { key: 'title', default: 'Untitled' },
	listItemSubtitle: { key: 'description', default: 'No description available' },
	listItemChips: [
		{ label: 'Due', key: 'due_at', color: 'error', type: 'datetime' }
	],
	detailRoute: 'Assignment',
	detailParamKey: 'assignmentId',
	viewAllRoute: 'Assignments',
	viewAllText: 'View All',
	limit: 3,
	emptyMessage: 'No assignments available'
};