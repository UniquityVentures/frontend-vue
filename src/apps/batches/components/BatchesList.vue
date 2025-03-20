<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text>
            <v-list v-if="!loading && limitedItems.length" lines="two">
                <v-list-item v-for="batch in limitedItems" :key="batch.id"
                    :to="{ name: 'Batch', params: { batchId: batch.id } }" link class="border">
                    <v-list-item-title>{{ batch.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ batch.main_teacher_details?.user_details?.full_name || "Loading..." }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-chip v-if="batch.is_active" color="success" size="small">Active</v-chip>
                        <v-chip v-else color="error" size="small">Inactive</v-chip>
                    </template>
                </v-list-item>
            </v-list>
            <v-skeleton-loader v-if="loading" type="list-item-two-line" v-for="i in limit" :key="i" />
            <div v-if="!loading && limitedItems.length === 0" class="text-center py-4">
                No batches found
            </div>
        </v-card-text>
        <v-card-actions v-if="viewAll" class="justify-center">
            <v-btn :to="viewAll.route">{{ viewAll.label }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getBatches } from "../api";

const props = defineProps({
    title: String,
    subtitle: String,
    filter: { type: Object, default: () => ({}) },
    viewAll: { 
        type: Object, 
        default: () => ({ 
            route: { name: 'Batches' }, 
            label: 'View All Batches' 
        }) 
    },
    limit: { type: Number, default: 5 },
});

const items = ref([]);
const loading = ref(true);
const limitedItems = computed(() => items.value.slice(0, props.limit));

onMounted(async () => {
    try {
        loading.value = true;
        const response = await getBatches(props.filter);
        items.value = response?.results || [];
    } catch (error) {
        console.error("Failed to fetch batches:", error);
    } finally {
        loading.value = false;
    }
});
</script> 