<template>
  <v-container>
    <EventForm
      :event="$route.query"
      actionName="Create"
      :action="handleCreate"
      title="Create New Event"
      :hideDelete="true"
    />
  </v-container>
</template>

<script setup>
import { createEvent } from "@/apps/calendar/api";
import EventForm from "../../calendar/components/EventForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleCreate = async (data) => {
  const resp = await createEvent(data);
  router.push({ name: "Event", params: { eventId: resp.id } });
  return resp;
};
</script> 