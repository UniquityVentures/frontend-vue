<template>
    <ResponsiveDataTable
        :fetch="getBatches"
        v-model:filters="props.filters"
        forceMobile="true"
        :title="props.title"
        :subtitle="props.subtitle"
        :templates="{
            desktop: 'card',
            mobile: 'card',
        }"
        :hide-filters="true"
    >
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="6" v-for="item in items" :key="item.id">
                    <BatchSmallCard :batch="item" />
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { getBatches } from "../api";
import BatchSmallCard from "./BatchSmallCard.vue";

const props = defineProps({
	filters: {
		type: Object,
		default: () => ({}),
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
</script>

<style>
.custom-img {
	aspect-ratio: 16/9;
	object-fit: cover;
	width: 100%;
	height: auto;
}
</style>
  
