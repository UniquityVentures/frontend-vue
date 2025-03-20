<template>
    <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
        <FilterCard :fields="fields" :exportFunction="exportBatches" v-model:filters="filters" />
        <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Batch', params: { batchId: item.id } })"
            :headers="defaultHeaders" :fetch="getBatches" v-model:filters="filters" 
            desktopTemplate="card" mobileTemplate="card" >
            <template #card-item-slot="{ item }">
                <v-card height="100%" link :to="{ name: 'Batch', params: { batchId: item.id }}" variant="flat" class="border">
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>{{ item.main_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
                    <v-card-text>
                        <v-chip prepend-icon="mdi-account-group" color="primary">
                            No of Students: {{ item.students.length }}
                        </v-chip>
                        <v-chip prepend-icon="mdi-book-open-variant" color="blue">
                            No. of Courses: {{ item.courses.length }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </template>
        </ResponsiveDataTable>
    </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getBatches, exportBatches } from "../api";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
        default: "Batches",
    },
    subtitle: {
        type: String,
        default: "Batches Master List",
    }
});

const defaultHeaders = [
    { label: "Name", key: "name" },
    { label: "Head Teacher", key: "main_teacher_details.user_details.full_name" },
    { label: "Standard", key: "standard" },
    { label: "Section", key: "section" },
    { label: "Active", key: "is_active", type: "boolean" }
];

const defaultFilterFields = [
    { label: "Search by name", type: "string", key: "name", value: "", defaultValue: "" },
    { label: "Head Teacher", type: "teacher", key: "main_teacher", value: null },
    { label: "Status", type: "n_nary", key: "is_active", value: null, fetchOptions: () => [
        { title: "All Classes", value: null },
        { title: "Active Only", value: "True" },
        { title: "Inactive Only", value: "False" },
    ]},
];

const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});
</script>