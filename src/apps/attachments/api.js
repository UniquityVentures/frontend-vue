import { api } from "@/services/api";
import { createViewset } from "@/services/viewset";

const attachmentViewset = createViewset("api/attachments");

const createAttachment = async (formObj) => {
	const data = new FormData();
	for (const [key, value] of Object.entries(formObj)) {
		data.append(key, value);
	}
	return (
		await api.post("api/attachments/create/", data, {
			headers: { "Content-Type": "multipart/form-data" },
		})
	).data;
};

const getAttachments = attachmentViewset.list;
const getAttachment = attachmentViewset.retrieve;
const getAttachmentStats = attachmentViewset.stats;
const deleteAttachment = attachmentViewset.delete;

export {
	createAttachment,
	getAttachments,
	getAttachment,
	getAttachmentStats,
	deleteAttachment,
};
