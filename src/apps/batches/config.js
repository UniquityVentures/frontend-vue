export const batchDefaultHeaders = [
	{ label: "Name", key: "name" },
	{ label: "Grade", key: "standard" },
	{ label: "Students Count", key: "students", formatFunc: (students) => students?.length || 0 },
	{ label: "Class Teacher", key: "class_teacher_details", type: 'teacher' },
]; 

export const batchDefaultFilterFields = [
	{
		label: "Search by name",
		type: "string",
		key: "name",
		value: "",
		defaultValue: "",
	},
	{
		label: "Grade",
		type: "n_nary",
		key: "standard",
		value: null,
		fetchOptions: () => [
			{ title: "All Grades", value: null },
			...[...Array(10)].map((_, i) => ({
				title: `Grade ${i + 1}`,
				value: (i + 1).toString(),
			})),
		],
	},
	{
		label: "Class Teacher",
		type: "teacher",
		key: "class_teacher",
		value: null,
	},
	{
		label: "Status",
		type: "n_nary",
		key: "is_active",
		value: null,
		fetchOptions: () => [
			{ title: "All Classes", value: null },
			{ title: "Active Only", value: "True" },
			{ title: "Inactive Only", value: "False" },
		],
	},
];

export const batchDefaultFormFields = [
	{
		label: "Standard",
		key: "standard",
		type: "string",
	},
	{
		label: "Name",
		key: "name",
		type: "string",
	},
	{
		label: "Class Teacher",
		key: "class_teacher",
		type: "teacher",
	},
	{
		label: "Is Active",
		key: "is_active",
		type: "boolean",
	},
]

export const batchListConfig = {
    listItemTitle: { key: 'name', default: 'Unnamed Batch' },
    listItemSubtitle: { key: 'standard', default: 'No grade assigned' },
    listItemChips: [
        { label: 'Teacher', key: 'class_teacher_details', color: 'primary', type: 'teacher'}
    ],
    listItemRoute: (item) => ({ name: 'Batch', params: { batchId: item.id } }),
    limit: 3,
    emptyMessage: 'No batches available'
}; 