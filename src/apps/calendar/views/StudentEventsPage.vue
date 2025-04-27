<template>
    <v-container>
        <ResponsiveDataTable :fetch="getEvents" v-model:filters="filters" title="Events" subtitle="All Events">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by title" v-model="filters.title" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <DateRangeSelect v-model:start="filters.start_date" v-model:end="filters.end_date"
                            label="Date Range" />
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list>
                    <v-list-item v-for="item in items" :key="item.id" link
                        :to="{ name: 'Event', params: { eventId: item.id } }" class="border">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                        <DateChip color="blue" label="Start" :date="item.start" />
                        <DateChip color="red" label="End" :date="item.end" />
                    </v-list-item>
                </v-list>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                        <v-card link :to="{ name: 'Event', params: { eventId: item.id } }" variant="flat" class="border">
                            <v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
                            <v-card-subtitle>{{ item.description.slice(0, 100) }}...</v-card-subtitle>
                            <v-card-text>
                                <DateChip color="blue" label="Start" :date="item.start" />
                                <DateChip color="red" label="End" :date="item.end" />
                            </v-card-text>
                            <v-card-text>
                                <TeacherChip label="Created by" :teacher="item.created_by_details"
                                    v-if="item.created_by_details" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </ResponsiveDataTable>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import DateChip from "@/components/DateChip.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import { getEvents } from "../api";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const account = authStore.getAccount;
const filters = ref({ batches: account.batch });
</script>