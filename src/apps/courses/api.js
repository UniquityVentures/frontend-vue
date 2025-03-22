import { createViewset } from "@/services/viewset";
const images = import.meta.glob("@/assets/courses/course*.png");

const getCourseImage = () => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
};

const courseViewset = createViewset("api/allocation/courses", "courses");

// Get base methods
const getCourses = courseViewset.list;
const getCourse = courseViewset.retrieve;
const createCourse = courseViewset.create;

const getCourseInfoFromObj = (item) => ({
    title: item.name,
    subtitle: item.code,
    value: item.id,
});

// Custom update method due to special data cleaning needs
const updateCourse = async (course) => courseViewset.update(course);

// Add export and import functionality
const exportCourses = courseViewset.export;
const importCourses = courseViewset.import;

export {
    getCourses,
    getCourse,
    getCourseImage,
    getCourseInfoFromObj,
    updateCourse,
    createCourse,
    exportCourses,
    importCourses,
};
