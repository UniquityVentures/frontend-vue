import { createViewset } from "@/services/viewset";

const teacherViewset = createViewset("api/accounts/teachers");

// Get base methods
const getTeachers = teacherViewset.list;
const getTeacher = teacherViewset.retrieve;
const getTeacherStats = teacherViewset.stats;

const getTeacherInfoFromObj = (item) => ({
	title: `${item.user_details.full_name}`,
	subtitle: item.identifier,
	value: item.id,
});

export {
	getTeachers,
	getTeacher,
	getTeacherInfoFromObj,
	getTeacherStats,
	teacherViewset,
};
