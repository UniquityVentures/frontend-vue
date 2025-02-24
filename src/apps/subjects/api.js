import { createViewset } from "@/services/viewset";

const subjectViewset = createViewset('api/allocation/subjects');

// Get base methods
const getSubjects = subjectViewset.list;
const getSubject = subjectViewset.retrieve;
const createSubject = subjectViewset.create;

const getSubjectInfoFromObj = (item) => ({
    title: item.name,
    subtitle: item.classroom_details
        ? item.classroom_details.name
        : "classroom loading...",
    value: item.id,
});

// Custom update method due to special data cleaning needs
const updateSubject = async (subject) => {
    const { classroom, teacher, ...cleanSubject } = JSON.parse(
        JSON.stringify(subject),
    );
    await subjectViewset.update(cleanSubject);
};

export {
    getSubjects,
    getSubject,
    getSubjectInfoFromObj,
    updateSubject,
    createSubject,
};
