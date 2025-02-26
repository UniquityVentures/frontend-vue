import { createViewset } from "@/services/viewset";

const studentViewset = createViewset("api/accounts/students");

// Get base methods
const getStudents = studentViewset.list;
const getStudent = studentViewset.retrieve;
const updateStudent = studentViewset.update;
const createStudent = studentViewset.create;
const getStudentStats = studentViewset.stats;
const exportStudents = studentViewset.export;
const importStudents = studentViewset.import;

const getStudentInfoFromObj = (item) => ({
	title: `${item.user_details.full_name}`,
	subtitle: item.identifier,
	value: item.id,
});

const studentHeaders = [
	{ title: "Name", key: "user_details", formatFunc: (item) => item.full_name },
	{ title: "Student No", key: "student_no" },
    { title: "Class", key: "classroom_details", formatFunc: (item) => item.name },
    { title: "Roll Number", key: "roll_no" },
	{ title: "", key: "actions", align: "end", sortable: false },
];

export {
    getStudents,
    getStudent,
    getStudentInfoFromObj,
    updateStudent,
    createStudent,
    getStudentStats,
    exportStudents,
    importStudents,
    studentHeaders,
};
