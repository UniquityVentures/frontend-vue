<template>
    <v-container v-if="batch">
        <ResponsiveDataTable :fetch="getStudents" v-model:filters="filters"
        title="Students" :subtitle="`Students for ${batch.name}`" :templates="{ desktop: 'card', mobile: 'card' }">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by name" v-model="filters.name" />
                    </v-col>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by roll number" v-model="filters.roll_no" />
                    </v-col>
                </v-row>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="6" md="3" lg="2" v-for="item in items" :key="item.id">
                        <StudentSmallCard :student="item" >
                        </StudentSmallCard>
                    </v-col>
                </v-row>
            </template>
        </ResponsiveDataTable>
    </v-container> 
</template>

<script setup>
import { getBatch } from "@/apps/batches/api";
import { getStudents } from "@/apps/students/api";
import StudentSelect from "@/apps/students/components/StudentSelect.vue";
import StudentSmallCard from "@/apps/students/components/StudentSmallCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
	batchId: [Number, String],
});

const batch = ref(null);
const filters = ref({ batch: props.batchId });

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>