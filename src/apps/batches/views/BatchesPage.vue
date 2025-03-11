<template>
    <v-container>
        <v-row>
            <v-col lg="4">
                <v-text-field
                    v-model="search"
                    label="Search by batch name"
                    density="comfortable"
                    @update:model-value="updateFilter"
                    clearable
                />
            </v-col>
        </v-row>
        <BatchesCard :filter="filter" />
    </v-container>
</template>

<script setup>
import BatchesCard from "@/apps/batches/components/BatchesCard.vue";
import { reactive, ref } from "vue";

const search = ref("");
const filter = reactive({});

const updateFilter = (value) => {
	if (value) {
		filter.name = value;
	} else {
		filter.name = undefined;
	}
};
</script>
