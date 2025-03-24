<template>
    <ServerAutocomplete
        :fetch="getBatches"
        :getInfo="getBatchInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false,
    },
    searchField: {
        type: String,
        default: "name",
    },
    rules: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: "Select Batch",
    }
});
</script>
