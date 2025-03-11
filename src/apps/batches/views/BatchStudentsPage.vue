<template>
    <v-container>
        <StudentsLookup class="column-item" :overrideFields="overrideFields" />   
    </v-container>
</template>

<script setup>
import StudentsLookup from '@/apps/students/components/StudentsLookup.vue';
import { ref } from 'vue';

const props = defineProps({
    batchId: String,
});

const overrideFields = ref([
{ label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
{ label: "Filter by batch", type: "batch", key: "batch", value: props.batchId, disabled: true, hidden: true },
{ label: "Search by roll number", type: "string", key: "roll_no", value: "", defaultValue: "" },
]);

</script>