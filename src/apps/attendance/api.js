import { createViewset } from "@/services/viewset";

const attendanceRecordViewset = createViewset("api/attendance-records", "attendance-records");

// Get base methods
const getAttendanceRecords = attendanceRecordViewset.list;
const getAttendanceRecord = attendanceRecordViewset.retrieve;
const updateAttendanceRecord = attendanceRecordViewset.update;
const createAttendanceRecord = attendanceRecordViewset.create;
const exportAttendanceRecords = attendanceRecordViewset.export;
const importAttendanceRecords = {
	dryRun: attendanceRecordViewset.import.dryRun,
	    finalize: attendanceRecordViewset.import.finalize,
};

// Add bulk update attendance function
const bulkUpdateAttendance = async (payload) => {
    try {
        const response = await fetch('/api/attendance/bulk-update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to update attendance');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting attendance:', error);
        throw error;
    }
};

export {
	getAttendanceRecords,
	getAttendanceRecord,
	updateAttendanceRecord,
	createAttendanceRecord,
	exportAttendanceRecords,
	importAttendanceRecords,
	bulkUpdateAttendance,
};
