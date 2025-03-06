import { getClassroom } from './api';

export const classroomDefaultHeaders = [
	{ title: "Name", key: "name" },
	{ title: "Grade", key: "standard" },
	{
		title: "Students Count",
		key: "students",
		formatFunc: (students) => students?.length || 0,
	},
	{
		title: "Class Teacher",
		key: "class_teacher_details",
		type: 'teacher'
	},
	{ title: "Actions", key: "actions", sortable: false },
];

export const classroomDefaultFilterFields = [
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

export const classroomListConfig = {
    listItemTitle: { key: 'name', default: 'Unnamed Classroom' },
    listItemSubtitle: { key: 'standard', default: 'No grade assigned' },
    listItemChips: [
        { label: 'Teacher', key: 'class_teacher_details', color: 'primary', type: 'teacher'}
    ],
    listItemRoute: (item) => ({ name: 'Classroom', params: { classroomId: item.id } }),
    limit: 3,
    emptyMessage: 'No classrooms available'
}; 