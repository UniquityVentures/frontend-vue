import { createViewset } from "@/services/viewset";

const images = [
	require("@/assets/classrooms/classroom1.png"),
	require("@/assets/classrooms/classroom2.png"),
	require("@/assets/classrooms/classroom3.png"),
];

const classroomViewset = createViewset("api/allocation/classrooms");

// Get base methods with page size limit
const getClassrooms = (filters = {}) => classroomViewset.list({ ...filters, page_size: 1000 });
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

const classroomHeaders = [
	{ title: "Name", key: "name" },
	{ title: "Grade", key: "standard" },
	{
		title: "Teacher",
		key: "teacher_details",
		formatFunc: (teacher) => teacher?.user_details?.full_name || "-",
	},
	{
		title: "Students Count",
		key: "students",
		formatFunc: (students) => students?.length || 0,
	},
	{
		title: "Status",
		key: "is_active",
		formatFunc: (status) => (status ? "Active" : "Inactive"),
	},
	{ title: "Actions", key: "actions", sortable: false },
];

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
	classroomHeaders,
};
