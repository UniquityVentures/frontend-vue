import { createViewset } from "@/services/viewset";

const studentViewset = createViewset('api/accounts/students');

// Get base methods
const getStudents = studentViewset.list;
const getStudent = studentViewset.retrieve;
const updateStudent = studentViewset.update;
const createStudent = studentViewset.create;
const getStudentStats = studentViewset.stats;

const getStudentInfoFromObj = (item) => ({
    title: `${item.user_details.full_name}`,
    subtitle: item.identifier,
    value: item.id,
});

export {
    getStudents,
    getStudent,
    getStudentInfoFromObj,
    updateStudent,
    createStudent,
    getStudentStats,
    studentViewset,
};
