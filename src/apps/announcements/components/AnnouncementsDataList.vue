<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
    
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Announcement', params: {announcementId: item.id}})" 
      :headers="headers" 
      :fetch="getAnnouncements" 
      v-model="props.filters"
      :forceMobile="true"
    />

    <v-card-actions v-if="buttons" class="justify-center gap-2 flex-wrap">
      <v-btn
        v-for="button in buttons"
        :key="button.text"
        color="primary"
        variant="outlined"
        :to="button.to"
      >
        {{ button.text }}
        <v-icon end icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup> 
import { getAnnouncements } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  filters: {
    type: Object,
    default: () => ({})
  },
  buttons: {
    type: Array,
    default: null
  }
});

const formatDate = (dateString) =>
  Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(Date.parse(dateString));

const headers = [
  { title: "Title", key: "title" },
  { title: "Release Date", key: "release_at", formatFunc: formatDate },
  { title: "Expiry Date", key: "expiry_at", formatFunc: formatDate },
  {
    title: "Signed By",
    key: "signed_by_details",
    formatFunc: (signedBy) => signedBy.user_details.full_name,
  },
  { title: "Actions", key: "actions", sortable: false },
];
</script>
