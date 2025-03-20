<template>
    <v-card>
        <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportAnnouncements" v-model:filters="filters" />
        </v-card-title>
        <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Announcement', params: { announcementId: item.id } })"
            :headers="defaultHeaders" :fetch="getAnnouncements" v-model:filters="filters" />
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { getAnnouncements, exportAnnouncements } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
});

const defaultHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Release Date", key: "release_at", type: "date" },
    { label: "Expiry Date", key: "expiry_at", type: "date" },
    { label: "Signed By", key: "signed_by_details", type: "teacher" },
];

const defaultFields = [
    { label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
    { label: "Filter by batch", type: "batch", key: "batch", value: null },
    { label: "Filter by course", type: "course", key: "course", value: null },
    { label: "Filter by signer", type: "teacher", key: "signed_by", value: null },
    { label: "Is School Wide", type: "n_nary", key: "is_school_wide", value: null, fetchOptions: () => [
        { title: "All Announcements", value: null },
        { title: "School Wide Only", value: "True" },
        { title: "Non-School Wide Only", value: "False" },
    ],
    },
    { label: "Is Released", type: "boolean", key: "is_released", value: null },
    { label: "Is Expired", type: "boolean", key: "is_expired", value: null },
    { label: "Release Date Range", type: "dates", key: ["released_start", "released_end"], value: null },
    { label: "Expiry Date Range", type: "dates", key: ["expired_start", "expired_end"], value: null },
];

const fields = ref(props.overrideFields ? props.overrideFields : defaultFields);
const filters = ref({}); 

</script>