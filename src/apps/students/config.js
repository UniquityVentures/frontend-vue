export const studentDefaultHeaders = [
    { label: "Name", key: "user_details.full_name"},
    { label: "Student No", key: "student_no" },
    { label: "Batch", key: "batch_details", type: "batch" },
];

export const studentDefaultFilterFields = [
    { label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
    { label: "Filter by batch", type: "batch", key: "batch", value: null },
    { label: "Filter by grade level", type: "n_nary", key: "grade_level", value: null, 
      fetchOptions: () => [
        { title: "All Grades", value: null },
        { title: "Grade 1", value: "1" },
        { title: "Grade 2", value: "2" },
        { title: "Grade 3", value: "3" },
        { title: "Grade 4", value: "4" },
        { title: "Grade 5", value: "5" },
        { title: "Grade 6", value: "6" },
        { title: "Grade 7", value: "7" },
        { title: "Grade 8", value: "8" },
        { title: "Grade 9", value: "9" },
        { title: "Grade 10", value: "10" },
        { title: "Grade 11", value: "11" },
        { title: "Grade 12", value: "12" },
      ]
    },
    { label: "Filter by status", type: "n_nary", key: "status", value: null,
      fetchOptions: () => [
        { title: "All Students", value: null },
        { title: "Active", value: "active" },
        { title: "Inactive", value: "inactive" },
        { title: "Pending", value: "pending" },
      ]
    },
    { label: "Enrollment Date Range", type: "dates", key: ["enrolled_start", "enrolled_end"], value: null },
];

export const studentDefaultFormFields = [
    { label: "First Name", type: "string", key: "first_name", required: true },
    { label: "Last Name", type: "string", key: "last_name", required: true },
    { label: "Student Number", type: "string", key: "student_no", required: true },
    { label: "Email", type: "email", key: "email", required: true },
    { label: "Status", type: "select", key: "status", required: true, 
      options: [
        { title: "Active", value: "active" },
        { title: "Inactive", value: "inactive" },
        { title: "Pending", value: "pending" },
      ],
      defaultValue: "pending"
    },
    { label: "Grade Level", type: "select", key: "grade_level", required: true,
      options: Array.from({ length: 12 }, (_, i) => ({ 
        title: `Grade ${i+1}`, 
        value: (i+1).toString() 
      }))
    },
    { label: "Batch", type: "batch", key: "batch", required: true },
    { label: "Parent/Guardian Name", type: "string", key: "guardian_name" },
    { label: "Parent/Guardian Contact", type: "phone", key: "guardian_contact" },
    { label: "Address", type: "longstring", key: "address" },
    { label: "Date of Birth", type: "date", key: "date_of_birth" },
    { label: "Enrollment Date", type: "date", key: "enrollment_date", defaultValue: new Date().toISOString().split('T')[0] },
    { label: "Profile Picture", type: "image", key: "profile_picture" },
    { label: "Additional Notes", type: "longstring", key: "notes" },
];

export const studentListConfig = {
    listItemTitle: { key: 'user_details.full_name', default: 'Unnamed Student' },
    listItemSubtitle: { key: 'student_no', default: 'No student number' },
    listItemChips: [
        { label: 'Status', key: 'status', color: 'primary', type: 'chip' },
        { label: 'Grade', key: 'grade_level', color: 'secondary', type: 'chip' },
        { label: 'Batch', key: 'batch_details.name', color: 'info', type: 'chip' }
    ],
    listItemRoute: (item) => ({ name: 'Student', params: { studentId: item.id } }),
    lines: 'two',
    limit: 5,
    emptyMessage: 'No students available'
};
