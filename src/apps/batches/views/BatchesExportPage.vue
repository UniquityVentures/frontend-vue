<template>
  <v-container>
    <ResponsiveDataTable :fetch="getBatches" v-model:filters="filters"
    title="Batches" subtitle="Batches Master List" :templates="{ desktop: 'card', mobile: 'card' }">
        <template #filters-slot>
            <v-row >
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Search by name" v-model="filters.name" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <ExportButton :exportFunction="exportBatches" />
                </v-col>
            </v-row>
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2" v-for="item in items" :key="item.id">
                    <BatchSmallCard :batch="item" />
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
  </v-container>
</template>

<script setup>
import ExportButton from "@/components/ExportButton.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { exportBatches, getBatches } from "../api";
import BatchSmallCard from "../components/BatchSmallCard.vue";
const filters = ref({});
</script>
