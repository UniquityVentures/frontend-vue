<template>
    <v-card v-if="batch">
        <v-card-title>
            Students List
        </v-card-title>
        <v-card-subtitle>
            Students in {{ batch?.name }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" v-model:filters="filters" />
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
                :headers="headers" :fetch="getStudents" v-model:filters="filters" desktopTemplate="card"
                mobileTemplate="card" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getStudents } from '@/apps/students/api';
import ResponsiveDataTable from '@/components/ResponsiveDataTable.vue';
import FilterCard from '@/components/FilterCard.vue';

const props = defineProps({
    batch: Object,
});

const filters = ref({})

const fields = ref([
    { label: 'Search by name', type: 'string', key: 'name', value: '', defaultValue: '' },
    { label: 'Filter by batch', type: 'batch', key: 'batch', value: props.batch.id, disabled: true, hidden: true },
    { label: 'Search by roll number', type: 'string', key: 'roll_no', value: '', defaultValue: '' },
]);

const headers = ref([
    { label: 'Name', key: 'user_details.full_name' },
    { label: 'Roll Number', key: 'roll_no' },
]);

</script>