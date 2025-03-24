<template>
    <ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters"
    title="Announcements" subtitle="Announcements Master List">
        <template #filters-slot>
            <v-row >
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Search by title" v-model="filters.title" />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field label="Search by description" v-model="filters.description" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <TeacherSelect v-model="filters.signed_by" label="Signed by" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <BatchSelect v-model="filters.batch" label="Batch" />
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3">
                    <DateRangeSelect 
                        :filters="filters"
                        start-key="released_start"
                        end-key="released_end"
                        label="Release Date Range" 
                    />
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3">
                    <DateRangeSelect 
                        :filters="filters"
                        start-key="expired_start"
                        end-key="expired_end"
                        label="Expiry Date Range" 
                    />
                </v-col>
            </v-row>
        </template>
        <template #list-slot="{ items }">
            <v-list density="compact" lines="two">
                <v-list-item v-for="item in items" :key="item.id" class="border" link
                :to="{ name: 'Announcement', params: { announcementId: item.id } }" >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getAnnouncements } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import DateRangeSelect from "../../../components/DateRangeSelect.vue";

const filters = ref({});

</script>