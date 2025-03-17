<template>
	<v-container class="columns-container">
		<StatsCard class="column-item" title="Students" :fetchStats="getStudentStats" />
		<StatsCard class="column-item" title="Teachers" :fetchStats="getTeacherStats" />
		<GenericList 
			class="column-item"
			:fetchFunction="getAnnouncements"
			:config="announcementListConfig"
			:title="'Announcements'"
      viewAllRoute="Announcements"
		/>
	</v-container>
</template>

<script setup>
import { getStudentStats } from "@/apps/students/api";
import { getTeacherStats } from "@/apps/teachers/api";

import { getAnnouncements } from "@/apps/announcements/api";
import { announcementListConfig } from "@/apps/announcements/config";
import GenericList from "@/components/GenericList.vue";
import StatsCard from "@/components/StatsCard.vue";
</script>
