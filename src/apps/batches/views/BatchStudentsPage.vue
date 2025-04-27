<template>
    <v-container v-if="batch">
        <ResponsiveDataTable :fetch="getStudents" v-model:filters="filters"
        title="Students" :subtitle="`Students for ${batch.name}`" :templates="{ desktop: 'card', mobile: 'card' }"
        page_size="100">
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
                        <v-card height="100%" variant="flat" class="border" :to="{ name: 'Student', params: { studentId: item.id } }">
                            <v-card-title class="text-subtitle-1">
                                {{ item.name || item.user_details?.full_name }}
                            </v-card-title>
                            <v-card-subtitle>
                                Roll No: {{ item.roll_no }}
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </ResponsiveDataTable>
    </v-container> 
</template>

<script setup>
import { getBatch } from "@/apps/batches/api";
import { getStudents } from "@/apps/students/api";
import StudentSmallCard from "@/apps/students/components/StudentSmallCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
	batchId: [Number, String],
});

const batch = ref(null);
const filters = ref({ batch: props.batchId, sort_by: "roll_no" });

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>
