<template>
    <v-container>
		<v-row>
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
                    :disable-views="['years', 'week', 'month', 'year']"
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
			</v-col>
		</v-row>
	</v-container>

</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getEvents } from "../api";
import VueCal from "vue-cal";

// Calendar state
const currentDate = ref(new Date());
const events = ref([]);
const date = ref(new Date());
// Replace onMounted and add fetchEvents function
const fetchEvents = async () => {
	try {
		const filter = {
			date: date.value,
		};
		const response = await getEvents(filter);
		events.value = response;
	} catch (error) {
		console.error("Error fetching events:", error);
	}
};

onMounted(() => {
	fetchEvents();
});

// Format events for vue-cal
const formattedEvents = computed(() =>
	events.value.map((event) => ({
		id: event.id,
		title: event.title,
		start: new Date(event.start),
		end: new Date(event.end),
	})),
);

</script>
