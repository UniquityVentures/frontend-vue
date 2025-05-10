<template>
	<v-card>
		<v-card-title>
			Events
		</v-card-title> 
		<v-card-subtitle>
			All Events
		</v-card-subtitle> 

		<v-card-text>
			<v-row class="ml-4">
				<v-col lg="6" sm="12">
					<v-row>
						<DateSelect v-model="filters.start_date" label="Select Start Date" required />
					</v-row>
					<v-row>
						<BatchSelect v-model="filters.batch" label="Batch" />
					</v-row>
					<v-row>
						<CourseSelect v-model="filters.course" label="Course" />
					</v-row>
					<v-row>
						<v-checkbox 
							label="Is Universal" 
							v-model="filters.is_universal"
							class="mb-4"
						></v-checkbox>
					</v-row>
				</v-col>
				<v-col lg="6" sm="12">
					<ResponsiveDataTable :fetch="getEvents" v-model:filters="filters"
						:templates="{ desktop: 'card', mobile: 'card' }"
						hideFilters
						variant="flat"
						class="border"
					>
						<template #cards-slot="{ items }">
							<v-timeline :direction="vertical" density="compact" >
								<v-timeline-item
									v-for="event in items"
									:key="event.id"
									dot-color="primary"
									size="small"
									fill-dot
								>
									<v-card :to="{ name: 'Event', params: { eventId: event.id } }" variant="outlined" class="border">
										<v-card-title class="text-subtitle-1">
											{{ event.title }}
										</v-card-title>
										<v-card-subtitle class="text-caption">
											{{ event.description.slice(0, 40) }}...
										</v-card-subtitle>
										<v-card-text class="text-caption">
											<v-chip color="green">Start: {{ formatDateTime(event.start) }}</v-chip>
											<v-chip color="red">End: {{ formatDateTime(event.end) }}</v-chip>
											<TeacherChip label="Created By" :teacher="event.created_by_details" v-if="event.created_by_details" />
										</v-card-text>
									</v-card>
								</v-timeline-item>
							</v-timeline>
						</template>
					</ResponsiveDataTable>
				</v-col>
			</v-row>
		</v-card-text>

	</v-card>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getEvents } from "../api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { formatDateTime } from "@/services/utils";
import DateSelect from "@/components/DateSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";

const filters = ref({
	start_date: new Date(),
	sort_by: "start",
});

// Format date+time for display in the upcoming events timeline
const getDateTime = (date) => {
	if (!date) return "";
	// Check if date is a Date object, if not, try to parse it
	const dateObj = new Date(date);
	if (!dateObj) return "Invalid Date"; // Handle invalid date strings

	return new Intl.DateTimeFormat("default", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	}).format(dateObj);
};

// Format time only (used in vue-cal)
const getTime = (date) => {
	if (!date) return "";
	const dateObj = new Date(date);
	if (!dateObj) return "Invalid Date";

	return new Intl.DateTimeFormat("default", {
		hour: "numeric",
		minute: "numeric",
	}).format(dateObj);
};
</script>

<style scoped>
.event-container {
border: 1px solid;
height: 100%;
width: 100%;
text-align: left;
}
</style>
