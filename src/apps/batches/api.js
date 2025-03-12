import { createViewset } from "@/services/viewset";

const images = [
	import("@/assets/batches/batch1.png"),
	import("@/assets/batches/batch2.png"),
	import("@/assets/batches/batch3.png"),
];

const batchViewset = createViewset("api/allocation/batches");

// Get base methods
const getBatches = (filter = {}) => batchViewset.list({
	page_size: 100,
	...filter
});
const getBatch = batchViewset.retrieve;
const updateBatch = batchViewset.update;
const createBatch = batchViewset.create;
const exportBatches = batchViewset.export;
const importBatchesDryRun = batchViewset.import.dryRun;
const importBatchesFinalize = batchViewset.import.finalize;

// Custom methods
const getBatchImage = () => {
	const index = Math.floor(Math.random() * images.length);
	return images[index];
};

const getBatchInfoFromObj = (item) => ({
	title: item.name,
	subtitle: `Grade ${item.standard}`,
	value: item.id,
});

export {
	getBatch,
	getBatches,
	updateBatch,
	getBatchImage,
	getBatchInfoFromObj,
	createBatch,
	exportBatches,
	importBatchesDryRun,
	importBatchesFinalize,
};
