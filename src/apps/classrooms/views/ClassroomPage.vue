<template>
	<v-container class="columns-container" v-if="classroom">
		<ClassroomCard class="column-item" :classroomId="classroomId" />
		<SubjectsList class="column-item" :filter="{ classroom: classroom.id }" />
		<AnnouncementsDataList
			class="column-item"
			title="Announcements"
			:filters="{ classroom: classroom.id }"
			:buttons="[
				{
					text: 'View All Announcements',
					to: { name: 'ClassroomAnnouncements', params: { classroomId } }
				}
			]"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import { getClassroom } from "@/apps/classrooms/api";

const props = defineProps({
	classroomId: Number,
});

const classroom = ref(null);

import ClassroomCard from "@/apps/classrooms/components/ClassroomCard.vue";
import SubjectsList from "@/apps/subjects/components/SubjectsList.vue";
import AnnouncementsDataList from "@/apps/announcements/components/AnnouncementsDataList.vue";

// Fetch classroom data
classroom.value = await getClassroom(props.classroomId);
</script>

<style scoped>
.columns-container {
	/* Default: one column (for mobile) */
	column-count: 1;
	column-gap: 1rem;
	/* You may need to adjust padding or margins inherited from v-container */
}

/* For larger screens, use 3 columns */
@media (min-width: 1024px) {
	.columns-container {
		column-count: 3;
	}
}

/* Prevent cards from splitting between columns */
.column-item {
	break-inside: avoid;
	margin-bottom: 1rem;
}
</style>
