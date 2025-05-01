<template>
		<v-row justify="center" align-content="center">
			<v-col lg="3">
				<v-date-picker
					v-model="date"
				></v-date-picker>
			</v-col>
			<v-col lg="5">
				<vue-cal
					:events="formattedEvents"
					style="min-height: 500px;"
					:selected-date="date"
					hide-view-selector
					active-view="day"
				>
					<template #event="{ event }">
						<v-card :to="{ name: 'Event', params: { eventId: event.id } }" class="event-container">
							<v-card-title class="text-subtitle-2">
								{{ event.title }}
							</v-card-title>
							<v-card-text>
								<v-chip color="green">Start: {{ getTime(event.start) }}</v-chip>
								<v-chip color="red">End: {{ getTime(event.end) }}</v-chip>
							</v-card-text>
						</v-card>
					</template>
				</vue-cal>
			</v-col>
		</v-row>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getEvents } from "../api";
import VueCal from "vue-cal";
import { formatDate } from "@/services/utils";
import { toApiDate } from "@/services/utils";

// Calendar state
const currentDate = ref(new Date());
const events = ref([]);
const date = ref(new Date());
// Replace onMounted and add fetchEvents function
const fetchEvents = async () => {
	try {
		const selectedDate = new Date(date.value);
		// Fix timezone issue by using a method that preserves the local date
		const year = selectedDate.getFullYear();
		const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
		const day = String(selectedDate.getDate()).padStart(2, '0');
		const localDate = `${year}-${month}-${day}`;
		
		const filter = {
			date: localDate,
		};
		const response = await getEvents(filter);
		events.value = response.results;
	} catch (error) {
		console.error("Error fetching events:", error);
	}
};

onMounted(() => {
	fetchEvents();
});

watch(date, fetchEvents);

// Format events for vue-cal
const formattedEvents = computed(() =>
	events.value.map((event) => ({
		id: event.id,
		title: event.title,
		start: new Date(event.start),
		end: new Date(event.end),
	})),
);
// Format date (this function just shows the time) for display
const getTime = (date) => {
	if (!date) return "";
	return new Intl.DateTimeFormat("default", {
		hour: "numeric",
		minute: "numeric",
	}).format(date);
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
