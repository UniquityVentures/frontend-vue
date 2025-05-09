<template>
		<v-row justify="center" align-content="center">
			<v-col lg="5">
				<v-card variant="flat">
					<v-card-title>Daily Schedule:</v-card-title>
					<v-card-subtitle>Select a date to view the schedule for that day.</v-card-subtitle>
					<v-card-text>
				<v-date-input
					v-model="date"
				></v-date-input>
				<vue-cal
					:events="formattedEvents"
					style="min-height: 500px;"
					:selected-date="date"
					hide-view-selector
                    hide-title-bar
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
				</v-card-text>
				</v-card>
			</v-col>
			<v-col lg="4">
				<v-card variant="flat">
					<v-card-title>Upcoming Events</v-card-title>
					<v-card-text>
						<v-timeline density="compact" >
							<v-timeline-item
								v-for="event in upcomingEvents"
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
							<v-timeline-item v-if="!upcomingEvents.length" dot-color="grey" size="small" fill-dot>
								<div class="ms-2 text-caption">No upcoming events.</div>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
					<v-card-actions>
						<v-btn :to="{ name: 'Events' }">View All</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getEvents } from "../api";
import VueCal from "vue-cal";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { formatDateTime } from "@/services/utils";

// Calendar state for selected date
const currentDate = ref(new Date());
const events = ref([]); // Events for the selected date
const date = ref(new Date());

// State for upcoming events
const upcomingEvents = ref([]);

// Fetch events for the selected date
const fetchEvents = async () => {
	try {
		const selectedDate = new Date(date.value);
		// Clear time part for filtering by day
		selectedDate.setHours(0, 0, 0, 0);

		const filter = {
			date: selectedDate, // Send date as YYYY-MM-DD
		};
		const response = await getEvents(filter);
		// Format events for vue-cal immediately after fetching
		events.value = response.results.map(event => ({
			...event,
			start: new Date(event.start),
			end: new Date(event.end),
		}));
	} catch (error) {
		console.error("Error fetching events for selected date:", error);
		events.value = []; // Clear events on error
	}
};

// Fetch the next 5 upcoming events
const fetchUpcomingEvents = async () => {
	try {
		// Assuming getEvents without filters returns all future events
		// Or modify getEvents API to accept sorting/limiting parameters
		// e.g., getEvents({ sort: 'start:asc', limit: 5, futureOnly: true })
		const response = await getEvents({start_date: new Date(), sort_by: "start"}); // Fetch all events for now
		const now = new Date();
		// Filter for future events, sort by start date, take top 5
		upcomingEvents.value = response.results
			.map(event => ({ // Ensure dates are Date objects
				...event,
				start: new Date(event.start),
				end: new Date(event.end),
			}))
			.filter(event => event.start >= now) // Keep only future/ongoing events
			.sort((a, b) => a.start - b.start) // Sort by start date ascending
			.slice(0, 5); // Take the first 5
	} catch (error) {
		console.error("Error fetching upcoming events:", error);
		upcomingEvents.value = []; // Clear on error
	}
};

onMounted(() => {
	fetchEvents(); // Fetch events for the initially selected date
	fetchUpcomingEvents(); // Fetch upcoming events
});

// Refetch events when the selected date changes
watch(date, fetchEvents);

// Format events for vue-cal (uses 'events' state)
const formattedEvents = computed(() => events.value); // Already formatted in fetchEvents

// Format date+time for display in the upcoming events timeline
const getDateTime = (date) => {
	if (!date) return "";
	// Check if date is a Date object, if not, try to parse it
	const dateObj =  new Date(date);
	if (!dateObj) return "Invalid Date"; // Handle invalid date strings

	return new Intl.DateTimeFormat("default", {
		year: 'numeric', month: 'short', day: 'numeric',
		hour: "numeric", minute: "numeric",
	}).format(dateObj);
};

// Format time only (used in vue-cal)
const getTime = (date) => {
	if (!date) return "";
	const dateObj =  new Date(date);
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
