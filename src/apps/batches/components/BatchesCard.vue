<template>
    <v-card variant="flat">
        <v-card-text>
            <ResponsiveDataTable
                :headers="batchHeaders"
                :fetch="getBatches"
                v-model="filter"
                :getToFunction="(batch) => ({ name: 'Batch', params: { batchId: batch.id }})"
                desktopTemplate="card"
            >
                <!-- Custom template for each individual card item -->
                <template #card-item-slot="{ item }">
                    <v-card height="100%" link :to="{ name: 'Batch', params: { batchId: item.id }}" variant="flat" class="border">
                        <v-img 
                            :src="getBatchImage()" 
                            class="custom-img"
                        ></v-img>
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle>{{ item.class_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn :to="{ name: 'Batch', params: { batchId: item.id }}">Enter</v-btn>
                        </v-card-actions>
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
});

const filter = ref(props.filter);

// Define headers for the ResponsiveDataTable
const batchHeaders = [
	{ label: "Name", key: "name" },
	{ label: "Teacher", key: "class_teacher_details.user_details.full_name" },
	{ label: "Grade", key: "standard" },
	{ label: "Students Count", key: "students", formatFunc: (students) => students?.length || 0 },
];
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
  
