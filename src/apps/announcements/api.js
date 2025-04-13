import { createViewset } from "@/services/viewset";

const announcementViewset = createViewset("api/announcements", "announcements");

// Get base methods
const getAnnouncements = announcementViewset.list;
const getAnnouncement = announcementViewset.retrieve;
const updateAnnouncement = announcementViewset.update;
const createAnnouncement = announcementViewset.create;
const deleteAnnouncement = announcementViewset.delete;
const exportAnnouncements = announcementViewset.export;
const importAnnouncements = {
	dryRun: announcementViewset.import.dryRun,
	finalize: announcementViewset.import.finalize,
};

export {
	getAnnouncements,
	getAnnouncement,
	updateAnnouncement,
	createAnnouncement,
	deleteAnnouncement,
	exportAnnouncements,
	importAnnouncements,
};
