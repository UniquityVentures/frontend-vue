<template>
	<v-container class="columns-container">
		<StatsCard class="column-item" title="Students" :fetchStats="getStudentStats" />
		<StatsCard class="column-item" title="Teachers" :fetchStats="getTeacherStats" />
		<AnnouncementsList class="column-item" title="Announcements" subtitle="School-wide Announcements" />
	</v-container>
</template>

<script setup>
import { getStudentStats } from "@/apps/students/api";
import { getTeacherStats } from "@/apps/teachers/api";
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import StatsCard from "@/components/StatsCard.vue";
</script>
