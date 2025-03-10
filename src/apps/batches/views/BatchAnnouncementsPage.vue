<template>
    <v-container>
        <v-card variant="flat">
            <v-card-title>Announcements for {{ batch?.name }}</v-card-title>
            <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Announcement', params: { announcementId: item.id } })"
            :headers="announcementDefaultHeaders"
            :fetch="getAnnouncements"
            v-model="filters"
            :desktopTemplate="'list'"
            />
        </v-card>
    </v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import { announcementDefaultHeaders } from "@/apps/announcements/config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
import { getBatch } from "@/apps/batches/api";

const props = defineProps({
	batchId: {
		type: [String, Number],
		required: true
	}
});

const filters = ref({
	batch: props.batchId,
});

const batch = ref(null);

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});

</script>
