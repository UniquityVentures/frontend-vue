export const subjectListConfig = {
    listItemTitle: { key: 'name', default: 'Untitled' },
    listItemSubtitle: { key: 'teacher_details.user_details.full_name', default: 'No teacher assigned' },
    listItemRoute: (item) => ({ name: 'Subject', params: { subjectId: item.id } }),
    limit: 10,
    emptyMessage: 'No subjects available'
};

export const subjectDefaultFormFields = [
    { label: "Name", key: "name", type: "string" },
    { label: "Classroom", key: "classroom", type: "classroom" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Teacher", key: "teacher", type: "teacher" },
    { label: "Is Active", key: "is_active", type: "boolean" },
];
