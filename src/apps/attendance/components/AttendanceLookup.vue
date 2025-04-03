<template>
    <ResponsiveDataTable :fetch="getAttendanceRecords" v-model:filters="filters"
        :title="`Attendance Records Master`" :subtitle="`View attendance records for all students`"
        :templates="{ desktop: 'card', mobile: 'list' }">
        <template #filters-slot>
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <DateSelect v-model="filters.date" label="Select Date" required />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field v-model="filters.name" label="Student Name" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <BatchSelect v-model="filters.batch" label="Select Batch" required />
                </v-col>
            </v-row>
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2" v-for="item in items" :key="item.id">
                    <v-card variant="flat" class="border" height="100%"
                    :to="{ name: 'AttendanceRecord', params: { recordId: item.id } }"
                    >
                        <v-card-title class="text-subtitle-1">
                            {{ item.student_details?.user_details?.full_name || 'Unknown Student' }}
                        </v-card-title>
                        <v-card-subtitle>
                            Student No: {{ item.student_details?.student_no }}
                        </v-card-subtitle>
                        <v-card-text>
                            <BatchChip :batch="item.student_details?.batch_details" />
                            <v-chip>Roll No: {{ item.student_details?.roll_no }}</v-chip>
                        </v-card-text>
                        <v-card-text>
                            <v-chip>Date: {{ item.date }}</v-chip>
                            <v-chip :color="getStatusColor(item.status)" class="ml-auto">
                                {{ item.status }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template #list-slot="{ items }">
            <v-list>
                <v-list-item v-for="item in items" :key="item.id" class="border"
                :to="{ name: 'AttendanceRecord', params: { recordId: item.id } }"
                >
                    <v-list-item-title>
                        {{ item.student_details?.user_details?.full_name || 'Unknown Student' }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Roll No: {{ item.student_details?.roll_no }}
                    </v-list-item-subtitle>
                    <template #append>
                        <v-chip :color="getStatusColor(item.status)">
                            {{ item.status }}
                        </v-chip>
                    </template>
                </v-list-item>
            </v-list>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getAttendanceRecords } from "../api";
import DateSelect from "@/components/DateSelect.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import BatchChip from "@/apps/batches/components/BatchChip.vue";

const getStatusColor = (status) => {
    if (status === "Present") return "green";
    if (status === "Absent") return "red";
    return "gray";
};

const filters = ref({});

</script>