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
                            <template #menu>
                                <v-btn variant="text" class="border" size="small" icon>
                                    <v-icon>mdi-dots-vertical</v-icon>
                                    <v-menu activator="parent">
                                        <v-list>
                                            <v-list-item @click="removeFromBatch(item)">
                                                <v-list-item-title>Remove from batch</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-btn>
                            </template>
                        </StudentSmallCard>
                    </v-col>
                </v-row>
            </template>
        </ResponsiveDataTable>
    </v-container>
    <v-divider class="my-4"></v-divider>    
    <v-container class="columns-container">
        <v-card class="column-item">
            <v-card-title>Add Student to Batch</v-card-title>
            <v-card-subtitle color="error">Select students to add to this batch</v-card-subtitle>
            <v-card-text>
                <StudentSelect multiple />
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary">Add Selected Students to Batch</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Student Join Requests</v-card-title>
            <v-card-subtitle>Students who have requested to join this batch</v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item class="border">
                        <v-list-item-title>Student Name</v-list-item-title>
                        <v-list-item-subtitle>Student - Student Number</v-list-item-subtitle>
                        <template #append>
                            <v-btn color="green" size="small">Approve</v-btn>
                            <v-btn color="error" size="small">Reject</v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBatch } from '@/apps/batches/api';
import StudentSmallCard from '@/apps/students/components/StudentSmallCard.vue';
import ResponsiveDataTable from '@/components/ResponsiveDataTable.vue';
import { getStudents } from '@/apps/students/api';
import StudentSelect from '@/apps/students/components/StudentSelect.vue';

const props = defineProps({
    batchId: [Number, String],
});

const batch = ref(null);
const filters = ref({ batch: props.batchId });

onMounted(async () => {
    batch.value = await getBatch(props.batchId);
});

</script>