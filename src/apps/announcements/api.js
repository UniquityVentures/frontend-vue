import { createViewset } from "@/services/viewset";
import { formatDate } from "@/services/utils";

const announcementViewset = createViewset("api/announcements", "announcements");

// Get base methods
const getAnnouncements = announcementViewset.list;
const getAnnouncement = announcementViewset.retrieve;
const updateAnnouncement = announcementViewset.update;
const createAnnouncement = announcementViewset.create;
const exportAnnouncements = announcementViewset.export;
const importAnnouncements = {
	dryRun: announcementViewset.import.dryRun,
	finalize: announcementViewset.import.finalize,
};

const announcementHeaders = [
	{ title: "Title", key: "title" },
	{ title: "Release Date", key: "release_at", formatFunc: formatDate },
	{ title: "Expiry Date", key: "expiry_at", formatFunc: formatDate },
	{
		title: "Signed By",
		key: "signed_by_details",
		formatFunc: (signedBy) => signedBy.user_details.full_name,
	},
	{ title: "Actions", key: "actions", sortable: false },
];

export {
	getAnnouncements,
	getAnnouncement,
	updateAnnouncement,
	createAnnouncement,
	exportAnnouncements,
	importAnnouncements,
	announcementHeaders,
};
