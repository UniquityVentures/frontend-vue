<template>
    <v-card variant="flat">
        <v-card-text>
            <v-row>
                <v-col 
                v-for="batch in batches" 
                :key="batch.id" 
                cols="6" 
                md="3" 
                lg="2"
                >
                    <v-card>
                        <v-img 
                            :src="getBatchImage()" 
                            class="custom-img"
                        ></v-img>
                        <v-card-title>{{ batch.name }}</v-card-title>
                        <v-card-subtitle>{{ batch.class_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn :to="{ name: 'Batch', params: { batchId: batch.id }}">Enter</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { getBatchImage, getBatches } from "../api";

const props = defineProps({
	filter: {
		type: Object,
		default: () => ({}),
	},
});

const batches = ref([]);

const fetchBatches = async () => {
	batches.value = (await getBatches(props.filter)).results;
};

// Watch for changes in the filter
watch(() => props.filter, fetchBatches, { deep: true });

// Initial fetch
fetchBatches();
</script>

<style>
.custom-img {
	aspect-ratio: 16/9;
	object-fit: cover;
	width: 100%;
	height: auto;
}
</style>
  
