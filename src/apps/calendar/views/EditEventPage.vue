<template>
  <v-container>
    <EventForm
      v-if="event"
      actionName="Update"
      :action="updateEvent"
      :event="event"
      title="Edit Event"
    />
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getEvent, updateEvent } from "../api";
import EventForm from "../../calendar/components/EventForm.vue";

const props = defineProps({
  eventId: {
    type: Number,
    required: true,
  },
});

const event = ref(null);

onMounted(async () => {
  event.value = await getEvent(props.eventId);
});
</script>
