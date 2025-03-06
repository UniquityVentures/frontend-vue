import { formatDate } from "@/services/utils";

export const assignmentDefaultFilterFields = [
	{ label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
	{ label: "Search by description", type: "string", key: "description", value: "", defaultValue: "" },
	{ label: "Filter by subject", type: "subject", key: "subject", value: null },
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
	{ title: "Subject", key: "subject_details", type: "subject" },
	{ title: "Actions", key: "actions", sortable: false },
];

export const assignmentDefaultFormFields = [
	{ label: "Title", type: "string", key: "title", required: true },
	{ label: "Description", type: "longstring", key: "description", required: true },
	{ label: "Subject", type: "subject", key: "subject", required: true },
	{ label: "Release Date", type: "datetime", key: "release_at", required: true },
	{ label: "Expiry Date", type: "datetime", key: "expiry_at", required: true },
	{ label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
];

export const assignmentListConfig = {
	primaryField: { key: 'title', default: 'Untitled' },
	secondaryField: { key: 'description', default: 'No description available' },
	chips: [
		{
			text: (item) => `${item.subject_details?.name || 'No subject'} (${item.subject_details?.classroom_details?.name || 'No class'})`,
			color: (item) => item.subject_details?.classroom_details ? 'secondary' : 'grey',
			class: 'mr-2'
		},
		{
			text: (item) => `Due: ${formatDate(item.due_at)}`,
			color: (item) => isOverdue(item.due_at) ? 'error' : 'success'
		}
	],
	detailRoute: 'Assignment',
	detailParamKey: 'assignmentId',
	viewAllRoute: 'Assignments',
	viewAllText: 'View All',
	limit: 3,
	emptyMessage: 'No assignments available'
};

// Helper function for determining if date is overdue
const isOverdue = (dueDate) => {
	if (!dueDate) return false;
	return new Date(dueDate) < new Date();
};