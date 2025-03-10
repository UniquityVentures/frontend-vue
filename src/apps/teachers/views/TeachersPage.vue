<template>
	<v-container class="columns-container">
		<StatsCard class="column-item" title="Teachers" :fetchStats="getTeacherStats" />
		<TeachersLookup class="column-item card-width-2" />
	</v-container>
</template>

<script setup>
import { getTeacherStats } from "@/apps/teachers/api";
import TeachersLookup from "@/apps/teachers/components/TeachersLookup.vue";
import StatsCard from "@/components/StatsCard.vue";
</script>
