<template>
	<v-container class="columns-container">
		<StudentsStatsCard class="column-item" />
		<TeachersStatsCard class="column-item" />
		<GenericList 
			class="column-item"
			:fetchFunction="getAnnouncements"
			:config="announcementListConfig"
			:title="'Announcements'"
		/>
	</v-container>
</template>

<script setup>
import StudentsStatsCard from "@/apps/students/components/StudentsStatsCard.vue";
import TeachersStatsCard from "@/apps/teachers/components/TeachersStatsCard.vue";
import { getAnnouncements } from "@/apps/announcements/api";
import { announcementListConfig } from "@/apps/announcements/config";
import GenericList from "@/components/GenericList.vue";
</script>

<style scoped>
@import "@/assets/styles/cardLayout.css";
</style>
