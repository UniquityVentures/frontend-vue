<template>
	<v-row justify="center" align-content="center">
		<v-col md="3" sm="12">
			<v-card variant = "flat" class="pa-2">
				<v-card-title> {{formatDate(new Date())}}</v-card-title>
				<v-card-subtitle> Events after this time </v-card-subtitle>
				<v-card-text>
					<DateSelect v-model="filters.start_date" label="Select Start Date" required />
					<BatchSelect v-model="filters.batch" label="Batch" />
					<CourseSelect v-model="filters.course" label="Course" />
					<v-checkbox 
						label="Is Universal" 
						v-model="filters.is_universal"
						class="mb-4"
					></v-checkbox>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col md="6" sm="12" class="d-flex flex-column" justify="center" align-content="center">
			<v-timeline direction="vertical" side="end" density="compact" truncate-line="both" >
				<v-timeline-item
					v-for="event in events"
					:key="event.id"
					dot-color="primary"
					size="small"
					fill-dot
				>
					<v-card :to="{ name: 'Event', params: { eventId: event.id } }" variant="flat" class="event-container">
						<v-card-title class="text-subtitle-1">
							{{ event.title }}
						</v-card-title>
						<v-card-subtitle class="text-caption">
							{{ event.description.slice(0, 40) }}...
						</v-card-subtitle>
						<v-card-text class="text-caption">
							<v-chip color="green">Start: {{ formatDateTime(event.start) }}</v-chip>
							<v-chip color="red">End: {{ formatDateTime(event.end) }}</v-chip>
							<br>
							<TeacherChip label="Created By" :teacher="event.created_by_details" v-if="event.created_by_details" />
						</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
			<SubmitButton successText="Loaded" :onSubmit="loadMore" submitText="Load More">
				Load More
			</SubmitButton>
		</v-col>
	</v-row>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getEvents } from "../api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { formatDateTime, formatDate } from "@/services/utils";
import DateSelect from "@/components/DateSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import SubmitButton from "@/components/SubmitButton.vue";

const filters = ref({
	start_date: new Date(),
	sort_by: "start",
});

const events = ref([]);

const page = ref(1);

const loadMore = async () => {
	page.value += 1;
	const response = await getEvents({...filters.value, page: page.value});
	events.value = [...events.value, ...response.results];
	return response;
};

watch(
	filters.value,
	async () => {
		page.value = 1;
		events.value = (await getEvents(filters.value)).results;
	},
	{ deep: true, immediate: true },
);
</script>

<style scoped>
.event-container {
border: 1px solid;
height: 100%;
width: 100%;
text-align: left;
}
</style>
