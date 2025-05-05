import { getRandomImage } from "@/services/api";
import { createViewset } from "@/services/viewset";
import { api } from "@/services/api";

// Static imports work better for this use case
import batch1 from "@/assets/batches/batch1.png";
import batch2 from "@/assets/batches/batch2.png";
import batch3 from "@/assets/batches/batch3.png";

const images = [batch1, batch2, batch3];

const baseUrl = "api/allocation/batches"

const batchViewset = createViewset(baseUrl , "batches");

// Get base methods
const getBatches = (filter = {}) =>
	batchViewset.list({
		page_size: 100,
		...filter,
	});
const getBatch = batchViewset.retrieve;
const updateBatch = batchViewset.update;
const deleteBatch = batchViewset.delete;
const createBatch = batchViewset.create;
const exportBatches = batchViewset.export;
const importBatches = {
	dryRun: batchViewset.import.dryRun,
	finalize: batchViewset.import.finalize,
};

// Custom methods
const getBatchImage = () => getRandomImage(images);

const getBatchInfoFromObj = (item) => ({
	title: item.name,
	subtitle: `Grade ${item.standard}`,
	value: item.id,
});

export const promoteStudents = {
	dryRun: async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		return (
			await api.post(`${baseUrl}/promote/dry_run/`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
		).data;
	},

	finalize: async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		return (
			await api.post(`${baseUrl}/promote/final/`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
		).data;
	},
};
export {
	getBatches,
	getBatch,
	deleteBatch,
	updateBatch,
	getBatchImage,
	getBatchInfoFromObj,
	createBatch,
	exportBatches,
	importBatches,
};
