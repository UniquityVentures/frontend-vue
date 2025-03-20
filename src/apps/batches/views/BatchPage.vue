<template> 
	<v-container class="columns-container" v-if="batch">
		<BatchCard class="column-item" :batchId="batchId" />
		
		<CoursesList 
			class="column-item"
			:fetchFunction="getCourses"
			:filter="{ batches: batch.id }"
			title="Courses"
			:viewAll="{ route: { name: 'BatchCourses' }, label: 'View All Courses' }"
			:limit="10"
		/>
		
		<AnnouncementsList 
			class="column-item"
			:fetchFunction="getAnnouncements"
			:filter="{ batch: batch.id }"
			title="Announcements"
			:viewAll="{ route: { name: 'BatchAnnouncements' }, label: 'View All Announcements' }"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import { getBatch } from "@/apps/batches/api";
import { getCourses } from "@/apps/courses/api";
import { getAnnouncements } from "@/apps/announcements/api";
import BatchCard from "@/apps/batches/components/BatchCard.vue";
import CoursesList from "@/apps/courses/components/CoursesList.vue";
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";

const props = defineProps({
	batchId: Number,
});

const batch = ref(null);

// Fetch batch data
batch.value = await getBatch(props.batchId);
</script>
