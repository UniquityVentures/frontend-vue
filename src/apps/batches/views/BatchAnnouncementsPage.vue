<template>
    <v-container v-if="batch">
		<v-btn prepend-icon="mdi-plus" color="accent" :to="{ name: 'CreateAnnouncement', query: {batches: [batch.id]} }">
            Create New Announcement</v-btn>
        <v-btn prepend-icon="mdi-view-list" color="grey-darken-2" :to="{ name: 'AnnouncementsMaster', query: {batch: batch.id} }">
            View All Announcements</v-btn>
        <v-divider/>
		<NoticeBoard :filters="{batch: batchId}" />
    </v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementListItem from "@/apps/announcements/components/AnnouncementListItem.vue";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import { getBatch } from "@/apps/batches/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";

const props = defineProps({
	batchId: {
		type: String,
		required: true,
	},
});

const batch = ref(null);
const filters = ref({ batch: props.batchId });

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>
