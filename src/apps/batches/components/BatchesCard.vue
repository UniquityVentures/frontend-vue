<template>
    <v-card>
        <v-card-title v-if="props.title">
            {{ props.title }}
        </v-card-title>
        <v-card-subtitle v-if="props.subtitle">
            {{ props.subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <ResponsiveDataTable
                :fetch="getBatches"
                v-model="filter"
                :getToFunction="(batch) => ({ name: 'Batch', params: { batchId: batch.id }})"
                desktopTemplate="card"
                mobileTemplate="card"
                forceMobile="true"
            >
                <template #card-item-slot="{ item }">
                    <v-card height="100%" link :to="{ name: 'Batch', params: { batchId: item.id }}" variant="flat" class="border">
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle>{{ item.class_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
                    </v-card>
                </template>
            </ResponsiveDataTable>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { getBatchImage, getBatches } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

const props = defineProps({
	filter: {
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
    }
});

const filter = ref(props.filter);
</script>

<style>
.custom-img {
	aspect-ratio: 16/9;
	object-fit: cover;
	width: 100%;
	height: auto;
}

.body-grid-container {
	width: 100%;
	overflow: hidden;
}
</style>
  
