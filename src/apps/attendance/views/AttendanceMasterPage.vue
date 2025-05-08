<template>
	<v-container>
		<v-row justify="center" align-content="center">
			<v-col lg="3">
				<!-- <v-card  class="mb-2">
					<v-date-picker v-model="date" />
				</v-card> -->
				<StatsCard :key="filters" class="column-item" title="Attendance" :fetchStats="attendanceStats" />
			</v-col>
			<v-col lg="9">
				<AttendanceLookup v-model:filters="filters" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import StatsCard from "@/components/StatsCard.vue";
import { getAttendanceStats } from "@/apps/attendance/api";
import AttendanceLookup from "@/apps/attendance/components/AttendanceLookup.vue";

const date = ref(new Date());

const filters = ref({});

watch(date, () => {
	filters.value = { ...filters.value, date: date.value };
});

const attendanceStats = () => {
	return getAttendanceStats(filters.value);
};
</script>
