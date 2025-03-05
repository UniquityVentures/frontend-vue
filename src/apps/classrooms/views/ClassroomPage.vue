<template>
	<v-container class="columns-container" v-if="classroom">
		<ClassroomCard class="column-item" :classroomId=classroomId />
		
		<GenericList 
			class="column-item"
			:fetchFunction="getSubjects"
			:filter="{ classroom: classroom.id }"
			:title="'Subjects'"
			:config="subjectListConfig"
		/>
		
		<GenericList 
			class="column-item"
			:fetchFunction="getAnnouncements"
			:filter="{ classroom: classroom.id }"
			:title="'Announcements'"
			:viewAllRoute="'ClassroomAnnouncements'"
			:config="announcementListConfig"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import { getClassroom } from "@/apps/classrooms/api";
import { getSubjects } from "@/apps/subjects/api";
import { getAnnouncements } from "@/apps/announcements/api";
import { subjectListConfig } from "@/apps/subjects/config";
import { announcementListConfig } from "@/apps/announcements/config";
import GenericList from "@/components/GenericList.vue";
import ClassroomCard from "@/apps/classrooms/components/ClassroomCard.vue";

const props = defineProps({
	classroomId: Number,
});

const classroom = ref(null);

// Fetch classroom data
classroom.value = await getClassroom(props.classroomId);
</script>

<style scoped>
@import "@/assets/styles/cardLayout.css";
</style>
