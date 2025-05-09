<template>
    <ResponsiveDataTable :fetch="getBatches" v-model:filters="filters"
		:title="localisationStore.localise('Batches')" :subtitle="`${localisationStore.localise('Batches')} Master List`" :templates="{ desktop: 'card', mobile: 'card' }">
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
                    <BatchSmallCard :batch="item" />
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getBatches } from "../api";
import BatchSmallCard from "./BatchSmallCard.vue";
const filters = ref({});
import { useLocalisationStore } from "@/apps/preferences/api";
const localisationStore = useLocalisationStore();
</script>
