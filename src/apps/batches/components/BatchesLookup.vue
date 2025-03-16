<template>
    <v-card>
        <v-card-title>
            <FilterCard :fields="fields" />
        </v-card-title>
        <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Batch', params: { batchId: item.id } })"
            :headers="batchDefaultHeaders" :fetch="getBatches" v-model="filters" desktopTemplate="card" mobileTemplate="card" >
            <template #card-item-slot="{ item }">
                <v-card height="100%" link :to="{ name: 'Batch', params: { batchId: item.id }}" variant="flat" class="border">
                    <v-img 
                        :src="getBatchImage()" 
                        class="custom-img"
                    ></v-img>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>{{ item.class_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
                    <!-- <v-card-actions class="d-flex justify-center">
                        <v-btn :to="{ name: 'Batch', params: { batchId: item.id }}">Enter</v-btn>
                    </v-card-actions> -->
                </v-card>
            </template>
        </ResponsiveDataTable>
    </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed } from "vue";
import { getBatches, getBatchImage } from "../api";
import { batchDefaultHeaders, batchDefaultFilterFields } from "../config";
import { fieldsToFilters } from "@/services/utils";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
});

const fields = computed(() => {
    return props.overrideFields ? props.overrideFields : batchDefaultFilterFields;
});

const filters = computed(() => {
    return fieldsToFilters(fields.value);
});
</script>