import { createViewset } from "@/services/viewset";

const portraitImages = [
	...Array.from({ length: 30 }, (_, i) => require(`@/assets/portraits/portrait${i + 1}.svg`)),
];

const getPortraitImage = () => {
	const index = Math.floor(Math.random() * portraitImages.length);
	return portraitImages[index];
};

const teacherViewset = createViewset("api/accounts/teachers");

// Get base methods
const getTeachers = teacherViewset.list;
const getTeacher = teacherViewset.retrieve;
const getTeacherStats = teacherViewset.stats;

const getTeacherInfoFromObj = (item) => ({
	title: `${item.user_details?.full_name}`,
	subtitle: item.identifier,
	value: item.id,
});

export {
	getTeachers,
	getTeacher,
	getTeacherInfoFromObj,
	getTeacherStats,
	getPortraitImage,
	teacherViewset,
};
