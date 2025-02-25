import { createViewset } from "@/services/viewset";

const assignmentsViewset = createViewset("api/assignments", "assignments");

export const {
	list: getAssignments,
	retrieve: getAssignment,
	update: updateAssignment,
	create: createAssignment,
	export: exportAssignments,
	import: importAssignments,
} = assignmentsViewset;
