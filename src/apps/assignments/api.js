import { createViewset } from "@/services/viewset";

const assignmentsViewset = createViewset("api/assignments", "assignments");

// Get base methods
const getAssignments = assignmentsViewset.list;
const getAssignment = assignmentsViewset.retrieve;
const updateAssignment = assignmentsViewset.update;
const createAssignment = assignmentsViewset.create;
const deleteAssignment = assignmentsViewset.delete;
const exportAssignments = assignmentsViewset.export;
const importAssignments = {
	dryRun: assignmentsViewset.import.dryRun,
	finalize: assignmentsViewset.import.finalize,
};

export {
	getAssignments,
	getAssignment,
	updateAssignment,
	createAssignment,
	deleteAssignment,
	exportAssignments,
	importAssignments,
};
