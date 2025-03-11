<template> 
	<v-container class="columns-container" v-if="batch">
		<BatchCard class="column-item" :batchId=batchId />
		
		<GenericList 
			class="column-item"
			:fetchFunction="getCourses"
			:filter="{ batches: batch.id }"
			:title="'Courses'"
			:viewAllRoute="'BatchCourses'"
			:config="courseListConfig"
			:limit="10"
		/>
		
		<GenericList 
			class="column-item"
			:fetchFunction="getAnnouncements"
			:filter="{ batch: batch.id }"
			:title="'Announcements'"
			:viewAllRoute="'BatchAnnouncements'"
			:config="announcementListConfig"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import { getBatch } from "@/apps/batches/api";
import { getCourses } from "@/apps/courses/api";
import { getAnnouncements } from "@/apps/announcements/api";
import { courseListConfig } from "@/apps/courses/config";
import { announcementListConfig } from "@/apps/announcements/config";
import GenericList from "@/components/GenericList.vue";
import BatchCard from "@/apps/batches/components/BatchCard.vue";

const props = defineProps({
	batchId: Number,
});

const batch = ref(null);

// Fetch batch data
batch.value = await getBatch(props.batchId);
</script>
