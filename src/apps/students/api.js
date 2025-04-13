import { createViewset } from "@/services/viewset";

const studentViewset = createViewset("api/accounts/students");

// Get base methods
const getStudents = studentViewset.list;
const getStudent = studentViewset.retrieve;
const updateStudent = studentViewset.update;
const createStudent = studentViewset.create;
const deleteStudent = studentViewset.delete;
const exportStudents = studentViewset.export;
const getStudentStats = studentViewset.stats;
const importStudents = {
	dryRun: studentViewset.import.dryRun,
	finalize: studentViewset.import.finalize,
};

const getStudentInfoFromObj = (item) => ({
	title: `${item.user_details?.full_name}`,
	subtitle: item.student_no,
	value: item.id,
});

export {
	getStudents,
	getStudent,
	updateStudent,
	createStudent,
	deleteStudent,
	exportStudents,
	importStudents,
	getStudentStats,
	getStudentInfoFromObj,
};
