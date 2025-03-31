import { getRandomImage } from "@/services/api";
import { createViewset } from "@/services/viewset";

// Static imports work better for this use case
import batch1 from "@/assets/batches/batch1.png";
import batch2 from "@/assets/batches/batch2.png";
import batch3 from "@/assets/batches/batch3.png";

const images = [batch1, batch2, batch3];

const batchViewset = createViewset("api/allocation/batches", "batches");

// Get base methods
const getBatches = (filter = {}) =>
	batchViewset.list({
		page_size: 100,
		...filter,
	});
const getBatch = batchViewset.retrieve;
const updateBatch = batchViewset.update;
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

export {
	getBatches,
	getBatch,
	updateBatch,
	getBatchImage,
	getBatchInfoFromObj,
	createBatch,
	exportBatches,
	importBatches,
};
