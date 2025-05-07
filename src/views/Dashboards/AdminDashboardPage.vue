<template>
	<v-container class="columns-container">
		<StatsCard class="column-item" title="Students" :fetchStats="getStudentStats" />
		<StatsCard class="column-item" title="Teachers" :fetchStats="getTeacherStats" />
		<AnnouncementsList class="column-item" title="Notice Board" 
		subtitle="Announcements for the whole school" :filter="{is_school_wide: true, is_active: true}" />
		<RecentVisits class="column-item"/>
		<StatsCard :key="filters" class="column-item" title="Attendance" :fetchStats="getAttendanceStats" />
	</v-container>
</template>

<script setup>
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import { getStudentStats } from "@/apps/students/api";
import { getTeacherStats } from "@/apps/teachers/api";
import StatsCard from "@/components/StatsCard.vue";
import RecentVisits from "@/components/RecentVisits.vue";
import { getAttendanceStats } from "@/apps/attendance/api";
import { ref, watch } from "vue";

const date = ref(new Date());
const filters = ref({ date: date.value });

</script>