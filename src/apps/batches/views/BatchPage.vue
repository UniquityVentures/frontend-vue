<template> 
	<v-container class="columns-container">
		<BatchCard class="column-item" :batchId="batch.id" v-if="batch.id" />
		<CoursesList 
			v-if="batch.id"
			class="column-item"
			:filter="{ batches: batch.id || batch.id === 0 }"
			title="Courses"
			:viewAll="{ route: { name: 'BatchCourses' }, label: `View All ${localisationStore.localise('Courses')}` }"
			:limit="10"
		/>
		<AnnouncementsList 
			v-if="batch.id || batch.id === 0"
			class="column-item"
			:fetchFunction="getAnnouncements"
			:filter="{ batch: batch.id }"
			title="Announcements"
			:viewAll="{ route: { name: 'BatchAnnouncements' }, label: `View All ${localisationStore.localise('Announcements')}` }"
		/>
	</v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import { getBatch } from "@/apps/batches/api";
import BatchCard from "@/apps/batches/components/BatchCard.vue";
import { getCourses } from "@/apps/courses/api";
import CoursesList from "@/apps/courses/components/CoursesList.vue";
import { onMounted, ref } from "vue";
import { useLocalisationStore } from "@/apps/preferences/api";

const localisationStore = useLocalisationStore();

const props = defineProps({
	batchId: String,
});

const batch = ref({});

// Fetch batch data
onMounted(async () => {
	batch.value = await getBatch(props.batchId);
	console.log()

});
</script>
