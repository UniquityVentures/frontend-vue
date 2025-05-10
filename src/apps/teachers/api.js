import { createViewset } from "@/services/viewset";

const portraitImages = import.meta.glob("@/assets/portraits/portrait*.svg");

const getPortraitImage = () => {
	const im = Object.entries(portraitImages);
	const index = Math.floor(Math.random() * im.length);
	return im[index][0];
};

const teacherViewset = createViewset("api/accounts/teachers");

// Get base methods
const getTeachers = teacherViewset.list;
const getTeacher = teacherViewset.retrieve;
const updateTeacher = teacherViewset.update;
const createTeacher = teacherViewset.create;
const deleteTeacher = teacherViewset.delete;
const exportTeachers = teacherViewset.export;
const getTeacherStats = teacherViewset.stats;
const importTeachers = {
	dryRun: teacherViewset.import.dryRun,
	finalize: teacherViewset.import.finalize,
};

const teacherFields = teacherViewset.fields;

const getTeacherInfoFromObj = (item) => ({
	title: `${item.user_details?.full_name}`,
	subtitle: item.code,
	value: item.id,
});

export {
	getTeachers,
	getTeacher,
	updateTeacher,
	createTeacher,
	deleteTeacher,
	exportTeachers,
	importTeachers,
	getTeacherStats,
	teacherFields,
	getTeacherInfoFromObj,
	getPortraitImage,
};
