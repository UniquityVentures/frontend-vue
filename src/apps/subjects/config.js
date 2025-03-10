export const subjectListConfig = {
    listItemTitle: { key: 'name', default: 'Untitled' },
    listItemSubtitle: { key: 'main_teacher_details.user_details.full_name', default: 'No teacher assigned' },
    listItemRoute: (item) => ({ name: 'Subject', params: { subjectId: item.id } }),
    limit: 10,
    emptyMessage: 'No subjects available'
};

export const subjectDefaultFormFields = [
    { label: "Name", key: "name", type: "string" },
    { label: "Classroom", key: "classrooms", type: "classroom" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Teacher", key: "main_teacher", type: "teacher" },
    { label: "Is Active", key: "is_active", type: "boolean" },
];

export const subjectDefaultHeaders = [
    { label: "Name", key: "name" },
    { label: "Teacher", key: "main_teacher_details", type: 'teacher' },
    { label: "Status", key: "is_active", type: 'is_active' },
    { label: "Classrooms", key: "classrooms_details", type: 'classroom' },
];

export const subjectDefaultFilterFields = [
    { label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
    { label: "Classroom", type: "classroom", key: "classrooms", value: null },
    { label: "Main Teacher", type: "teacher", key: "main_teacher", value: null },
    { label: "Is Active", type: "n_nary", key: "is_active", value: null, fetchOptions: () => [
            { title: "All Subjects", value: null },
            { title: "Active Only", value: "True" },
            { title: "Inactive Only", value: "False" },
        ],
    },
];
