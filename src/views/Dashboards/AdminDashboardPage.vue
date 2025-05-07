<template>
	<v-container class="columns-container">
		<StatsCard class="column-item" title="Students" :fetchStats="getStudentStats" />
		<StatsCard class="column-item" title="Teachers" :fetchStats="getTeacherStats" />
		<AnnouncementsList class="column-item" title="Notice Board" 
		subtitle="Announcements for the whole school" :filter="{is_school_wide: true, is_active: true}" />
	</v-container>
</template>

<script setup>
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import { getStudentStats } from "@/apps/students/api";
import { getTeacherStats } from "@/apps/teachers/api";
import StatsCard from "@/components/StatsCard.vue";
</script>
