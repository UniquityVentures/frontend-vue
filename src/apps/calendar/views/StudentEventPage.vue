<template>
    <v-container>
        <v-row v-if="event">
            <v-col>
                <v-row class="ma-2 flex justify-center">
                    <v-col lg="8">
                        <v-card>
                            <v-card-title>{{ event?.title }}</v-card-title>

                            <v-card-text>
                                <p>{{ event?.description }}</p>
                            </v-card-text>

                            <v-card-text>
                                <h4 class="text-subtitle-1">Created by:</h4>
                                <TeacherListItem :teacher="event?.created_by_details" />
                            </v-card-text>

                            <v-card-text>
                                <h4 class="text-subtitle-1">Event Timings:</h4>
                                <DateChip label="Start" color="primary" :date="event?.start" />
                                <DateChip label="End" color="red" :date="event?.end" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-skeleton-loader v-else type="card, card-heading, card-text" />
    </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getEvent } from "../api";
import DateChip from "@/components/DateChip.vue";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";

const event = ref({});

const props = defineProps({
    eventId: [Number, String],
});

const fetchDetails = async () => {
    event.value = await getEvent(props.eventId);
};

onMounted(fetchDetails);
</script>