<template>
    <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportAnnouncements" v-model:filters="filters" />
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Announcement', params: { announcementId: item.id } })"
            :headers="defaultHeaders" :fetch="getAnnouncements" v-model:filters="filters" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAnnouncements, exportAnnouncements } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
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
    { label: "Search by title", type: FIELD_TYPES.STRING, key: "title", value: "", defaultValue: "" },
    { label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batch", value: null },
    { label: "Filter by course", type: FIELD_TYPES.COURSE, key: "course", value: null },
    { label: "Filter by signer", type: FIELD_TYPES.TEACHER, key: "signed_by", value: null },
    { label: "Is School Wide", type: FIELD_TYPES.N_NARY, key: "is_school_wide", value: null, fetchOptions: () => [
        { title: "All Announcements", value: null },
        { title: "School Wide Only", value: "True" },
        { title: "Non-School Wide Only", value: "False" },
    ]},
    { label: "Is Released", type: FIELD_TYPES.BOOLEAN, key: "is_released", value: null },
    { label: "Is Expired", type: FIELD_TYPES.BOOLEAN, key: "is_expired", value: null },
    { label: "Release Date Range", type: FIELD_TYPES.DATE_RANGE, key: ["released_start", "released_end"], value: null },
    { label: "Expiry Date Range", type: FIELD_TYPES.DATE_RANGE, key: ["expired_start", "expired_end"], value: null },
];

// Initialize fields with proper reactivity handling
const fields = ref(props.overrideFields || defaultFields);

// Initialize filters object to receive the values from FilterCard
const filters = ref({});

// Make sure to update fields when overrideFields changes
onMounted(() => {
    // Force reactivity update for fields if coming from props
    if (props.overrideFields) {
        fields.value = JSON.parse(JSON.stringify(props.overrideFields));
    }
});
</script>