import { createViewset } from "@/services/viewset";
import { getRandomImage } from "@/services/api";

const images = Object.values(
    import.meta.glob("@/assets/batches/batch*.png", {
        eager: true,
        query: "?url",
    }),
);

const batchViewset = createViewset("api/allocation/batches");

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
const importBatchesDryRun = batchViewset.import.dryRun;
const importBatchesFinalize = batchViewset.import.finalize;

// Custom methods
const getBatchImage = () => getRandomImage(images);

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
