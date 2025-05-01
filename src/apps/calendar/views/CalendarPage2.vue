<template>
	<v-container>
		<vue-cal
			:events="formattedEvents"
			style="min-height: 500px;"
			v-model:view="currentCalendarView.value"
			:view-date="$route?.query?.date ? new Date($route?.query?.date) : undefined"
			click-to-navigate
			@view-change="updateCurrentDate"
		>
			<template #event="{ event }">
				<v-card :to="{ name: 'Event', params: { eventId: event.id } }" class="event-container">
					<v-card-title class="text-subtitle-2">
						{{ event.title }}
					</v-card-title>
					<v-card-text>
						<v-chip color="green">Start: {{ formatDate(event.start) }}</v-chip>
						<v-chip color="red">End: {{ formatDate(event.end) }}</v-chip>
					</v-card-text>
				</v-card>
			</template>
		</vue-cal>
	</v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import VueCal from "vue-cal";
import { getCalendar } from "@/apps/calendar/api";
import { useRouter } from "vue-router";

const router = useRouter();

// Calendar state
const currentDate = ref(new Date());
const events = ref([]);

const currentCalendarView = ref("week");

// Fetch events for the current month/year
const fetchEvents = async () => {
	try {
		const date = new Date(currentDate.value);
		const filter = {
			month: date.getMonth() + 1, // JS months are 0-indexed
			year: date.getFullYear(),
		};
		const response = await getCalendar(filter);
		events.value = response;
	} catch (error) {
		console.error("Error fetching events:", error);
	}
};

onMounted(() => {
	fetchEvents();
	if (router.currentRoute.value.query.date) {
		currentCalendarView.value = "day";
	}
});

// Update current date based on vue-cal's view change and refetch events
const updateCurrentDate = (view) => {
	currentDate.value = new Date(view.startDate);
	fetchEvents();
};

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
const formatDate = (date) => {
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
padding: 4px;
}
</style>
