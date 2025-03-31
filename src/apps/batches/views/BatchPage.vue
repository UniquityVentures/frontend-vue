<template> 
	<v-container class="columns-container" v-if="batch">
		<BatchCard class="column-item" :batchId="batchId" />
		
		<CoursesList 
			v-if="batch.id"
			class="column-item"
			:filter="{ batches: batch.id || batch.id === 0 }"
			title="Courses"
			:viewAll="{ route: { name: 'BatchCourses' }, label: 'View All Courses' }"
			:limit="10"
		/>
		
		<AnnouncementsList 
			v-if="batch.id || batch.id === 0"
			class="column-item"
			:fetchFunction="getAnnouncements"
			:filter="{ batch: batch.id }"
			title="Announcements"
			:viewAll="{ route: { name: 'BatchAnnouncements' }, label: 'View All Announcements' }"
		/>

		<v-card class="column-item">
			<v-card-title>Join Code</v-card-title>
			<v-card-subtitle>Join Code for this batch</v-card-subtitle>
            <v-card-text>
                <v-text-field label="Join Code" :value="batch.join_code" readonly persistent-placeholder>
                    <template #append>
                        <v-btn color="green" size="small">Copy</v-btn>
                    </template>
                </v-text-field>
            </v-card-text>
		</v-card>
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

const props = defineProps({
	batchId: String,
});

const batch = ref({});

// Fetch batch data
onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>
