import { createViewset } from "@/services/viewset";
const images = import.meta.glob("@/assets/courses/course*.png");
import { api } from "@/services/api";

const getCourseImage = () => {
	const im = Object.entries(images);
	const index = Math.floor(Math.random() * im.length);
	return im[index][0];
};

const baseUrl = "api/allocation/courses";

const courseViewset = createViewset(baseUrl, "courses");

// Get base methods
const getCourses = courseViewset.list;
const getCourse = courseViewset.retrieve;
const createCourse = courseViewset.create;
const deleteCourse = courseViewset.delete;

const getCourseInfoFromObj = (item) => ({
	title: item.code,
	subtitle: item.name,
	value: item.id,
});

// Custom update method due to special data cleaning needs
const updateCourse = async (course) => courseViewset.update(course);

// Add export and import functionality
const exportCourses = courseViewset.export;
const importCourses = courseViewset.import;
const courseFields = courseViewset.fields;

const joinCourse = async (joinCode) =>
	(await api.patch(`${baseUrl}/join/${joinCode}`)).data;

export {
	getCourses,
	getCourse,
	getCourseImage,
	getCourseInfoFromObj,
	updateCourse,
	deleteCourse,
	createCourse,
	exportCourses,
	importCourses,
	joinCourse,
	courseFields,
};
