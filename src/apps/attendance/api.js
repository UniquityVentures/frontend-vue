import { createViewset } from "@/services/viewset";
import { api } from "@/services/api.js";

const attendanceRecordViewset = createViewset("api/attendance", "attendance");

// Get base methods
const getAttendanceRecords = attendanceRecordViewset.list;
const getAttendanceRecord = attendanceRecordViewset.retrieve;
const updateAttendanceRecord = attendanceRecordViewset.update;
const createAttendanceRecord = attendanceRecordViewset.create;
const exportAttendanceRecords = attendanceRecordViewset.export;
const getAttendanceStats = attendanceRecordViewset.stats;
const attendanceFields = attendanceRecordViewset.fields;
const importAttendanceRecords = {
	dryRun: attendanceRecordViewset.import.dryRun,
	finalize: attendanceRecordViewset.import.finalize,
};

// Add bulk update attendance function
const bulkUpdateAttendance = async (payload) => {
	try {
		const response = await api.post("/api/attendance/bulk-update/", payload);
		return response.data;
	} catch (error) {
		console.error("Error submitting attendance:", error);
		throw error;
	}
};

const getStatusColor = (status) => {
	if (status === "present") return "green";
	if (status === "absent") return "red";
	if (status === "late") return "orange";
	return "gray";
};

export {
	getAttendanceRecords,
	getAttendanceRecord,
	updateAttendanceRecord,
	createAttendanceRecord,
	exportAttendanceRecords,
	importAttendanceRecords,
	getAttendanceStats,
	attendanceFields,
	bulkUpdateAttendance,
};
