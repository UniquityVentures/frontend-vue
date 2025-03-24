<template>
    <ResponsiveDataTable :fetch="getBatches" v-model:filters="filters"
    title="Batches" subtitle="Batches Master List" :templates="{ desktop: 'card', mobile: 'card' }">
        <template #filters-slot>
            <v-row >
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Search by name" v-model="filters.name" />
                </v-col>
            </v-row>
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2" v-for="item in items" :key="item.id">
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
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getBatches, exportBatches } from "../api";

const filters = ref({});
</script>