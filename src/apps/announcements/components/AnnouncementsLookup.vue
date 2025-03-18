<template>
    <v-card>
        <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportAnnouncements" v-model:filters="filters" />
        </v-card-title>
        <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Announcement', params: { announcementId: item.id } })"
            :headers="announcementDefaultHeaders" :fetch="getAnnouncements" v-model:filters="filters" />
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { getAnnouncements, exportAnnouncements } from "../api";
import { announcementDefaultHeaders, announcementDefaultFilterFields } from "../config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
});

const fields = ref(props.overrideFields ? props.overrideFields : announcementDefaultFilterFields);
const filters = ref({}); // Simple ref instead of computed

</script>