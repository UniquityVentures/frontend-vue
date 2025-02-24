import { createViewset } from "@/services/viewset";

const images = [
    require("@/assets/classrooms/classroom1.png"),
    require("@/assets/classrooms/classroom2.png"),
    require("@/assets/classrooms/classroom3.png"),
];

const classroomViewset = createViewset('api/allocation/classrooms');

// Get base methods
const getClassrooms = classroomViewset.list;
const getClassroom = classroomViewset.retrieve;
const updateClassroom = classroomViewset.update;
const createClassroom = classroomViewset.create;
const exportClassrooms = classroomViewset.export;
const importClassroomsDryRun = classroomViewset.import.dryRun;
const importClassroomsFinalize = classroomViewset.import.finalize;

// Custom methods
const getClassroomImage = () => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
};

const getClassroomInfoFromObj = (item) => ({
    title: item.name,
    subtitle: `Grade ${item.standard}`,
    value: item.id,
});

export {
    getClassroom,
    getClassrooms,
    updateClassroom,
    getClassroomImage,
    getClassroomInfoFromObj,
    createClassroom,
    exportClassrooms,
    importClassroomsDryRun,
    importClassroomsFinalize,
};
