export const courseListConfig = {
    listItemTitle: { key: 'name', default: 'Untitled' },
    listItemSubtitle: { key: 'main_teacher_details.user_details.full_name', default: 'No teacher assigned' },
    listItemRoute: (item) => ({ name: 'Course', params: { courseId: item.id } }),
    limit: 10,
    emptyMessage: 'No courses available'
};

export const courseDefaultFormFields = [
    { label: "Name", key: "name", type: "string" },
    { label: "Batch", key: "batches", type: "batch" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Teacher", key: "main_teacher", type: "teacher" },
    { label: "Is Active", key: "is_active", type: "boolean" },
];

export const courseDefaultHeaders = [
    { label: "Name", key: "name" },
    { label: "Teacher", key: "main_teacher_details", type: 'teacher' },
    { label: "Status", key: "is_active", type: 'is_active' },
    { label: "Batches", key: "batches_details", type: 'batch' },
];

export const courseDefaultFilterFields = [
    { label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
    { label: "Batch", type: "batch", key: "batches", value: null },
    { label: "Main Teacher", type: "teacher", key: "main_teacher", value: null },
    { label: "Is Active", type: "n_nary", key: "is_active", value: null, fetchOptions: () => [
            { title: "All Courses", value: null },
            { title: "Active Only", value: "True" },
            { title: "Inactive Only", value: "False" },
        ],
    },
];
