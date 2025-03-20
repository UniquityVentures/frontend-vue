<template>
    <v-container>
        <AnnouncementsLookup 
            :overrideFields="overrideFields"
            :title="`Announcements for ${batch?.name}`"
        />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getBatch } from "@/apps/batches/api";
import AnnouncementsLookup from "@/apps/announcements/components/AnnouncementsLookup.vue";

const props = defineProps({
	batchId: {
		type: [String, Number],
		required: true
	}
});

const batch = ref(null);
batch.value = await getBatch(props.batchId);

const overrideFields = ref([
    { label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
    { label: "Filter by batch", type: "batch", key: "batch", value: props.batchId, disabled: true, hidden: true },
    { label: "Is Released", type: "boolean", key: "is_released", value: null },
    { label: "Is Expired", type: "boolean", key: "is_expired", value: null },
])
</script>
